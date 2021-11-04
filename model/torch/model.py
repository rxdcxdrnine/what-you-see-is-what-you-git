import torch
import torchvision
from PIL import Image


class FasterRCNNWrapper(torch.nn.Module):
    def __init__(self):
        super().__init__()
        self.model = torchvision.models.detection.fasterrcnn_resnet50_fpn(
            pretrained=True
        )

    def forward(self, x):
        output = self.model([x])

        # eval mode
        if len(output) == 1:
            return output[0]["boxes"], output[0]["labels"], output[0]["scores"]

        # train mode
        else:
            loss, detection = output
            return detection[0]["boxes"], detection[0]["labels"], detection[0]["scores"]


if __name__ == "__main__":
    image = Image.open("./input/horses.jpg")
    transformed = torchvision.transforms.ToTensor()(image)

    model = FasterRCNNWrapper()
    model.eval()
    output = model(transformed)

    script = torch.jit.script(model)
    script.save("model.pt")
