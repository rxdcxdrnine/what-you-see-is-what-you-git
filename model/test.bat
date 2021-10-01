:: start client docker container
start docker run -it^
  --name wysiwig-triton-client^
  --net=host nvcr.io/nvidia/tritonserver:21.09-py3-sdk

:: execute below command inside docker container
:: /workspace/install/bin/image_client -m densenet_onnx -c 3 -s INCEPTION /workspace/images/mug.jpg