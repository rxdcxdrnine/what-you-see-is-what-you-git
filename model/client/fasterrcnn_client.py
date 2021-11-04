import argparse
import numpy as np
import sys
import cv2
from PIL import Image

import tritonclient.grpc as grpcclient
import torchvision.transforms as transforms


DETECTION_THRESHOLD = 0.8

COCO_NAMES = [
    '__background__', 'person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus',
    'train', 'truck', 'boat', 'traffic light', 'fire hydrant', 'N/A', 'stop sign',
    'parking meter', 'bench', 'bird', 'cat', 'dog', 'horse', 'sheep', 'cow',
    'elephant', 'bear', 'zebra', 'giraffe', 'N/A', 'backpack', 'umbrella', 'N/A', 'N/A',
    'handbag', 'tie', 'suitcase', 'frisbee', 'skis', 'snowboard', 'sports ball',
    'kite', 'baseball bat', 'baseball glove', 'skateboard', 'surfboard', 'tennis racket',
    'bottle', 'N/A', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl',
    'banana', 'apple', 'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza',
    'donut', 'cake', 'chair', 'couch', 'potted plant', 'bed', 'N/A', 'dining table',
    'N/A', 'N/A', 'toilet', 'N/A', 'tv', 'laptop', 'mouse', 'remote', 'keyboard', 'cell phone',
    'microwave', 'oven', 'toaster', 'sink', 'refrigerator', 'N/A', 'book',
    'clock', 'vase', 'scissors', 'teddy bear', 'hair drier', 'toothbrush'
]

COLORS = np.random.uniform(0, 255, size=(len(COCO_NAMES), 3))

def draw_boxes(boxes, classes, labels, image):
    # read the image with OpenCV
    image = cv2.cvtColor(np.asarray(image), cv2.COLOR_BGR2RGB)
    for i, box in enumerate(boxes):
        color = COLORS[labels[i]]
        cv2.rectangle(
            image,
            (int(box[0]), int(box[1])),
            (int(box[2]), int(box[3])),
            color, 2
        )
        cv2.putText(image, classes[i], (int(box[0]), int(box[1]-5)),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, color, 2, 
                    lineType=cv2.LINE_AA)
    return image


if __name__ == '__main__':
    parser = argparse.ArgumentParser()

    parser.add_argument('-m',
                        '--model-name',
                        type=str,
                        default="fasterrcnn_torchscript",
                        required=False,
                        help='Name of model')
    parser.add_argument('-x',
                        '--model-version',
                        type=str,
                        required=False,
                        default="1",
                        help='Version of model. Default is to use latest version.')
    parser.add_argument('-u',
                        '--url',
                        type=str,
                        required=False,
                        default='localhost:8001',
                        help='Inference server URL. Default is localhost:8001.')
    parser.add_argument('image_filename',
                        type=str,
                        nargs='?',
                        default=None,
                        help='Input image / Input folder.')
    FLAGS = parser.parse_args()

    try:
        triton_client = grpcclient.InferenceServerClient(url=FLAGS.url)
    except Exception as e:
        print("channel creation failed: " + str(e))
        sys.exit()

    # transform image to numpy array
    transform = transforms.Compose([
        transforms.ToTensor(),
    ])

    image = Image.open(FLAGS.image_filename)
    image_arr = transform(image).cpu().detach().numpy()

    # add image type to input
    inputs = []
    inputs.append(grpcclient.InferInput('IMAGE__0', image_arr.shape, "FP32"))

    # set image data to input
    inputs[0].set_data_from_numpy(image_arr)

    # Test with no outputs
    results = triton_client.infer(
        model_name=FLAGS.model_name,
        model_version=FLAGS.model_version,
        inputs=inputs)

    # Get the output arrays from the results
    pred_bboxes = results.as_numpy('BOXES__0')
    pred_labels = results.as_numpy('LABELS__1')
    pred_scores = results.as_numpy('SCORES__2')

    boxes = pred_bboxes[pred_scores >= DETECTION_THRESHOLD].astype(np.int32)
    classes = [COCO_NAMES[i] for i in pred_labels]

    image = draw_boxes(boxes, classes, pred_labels, image)
    cv2.imshow("Image", image)
    cv2.waitKey(0)