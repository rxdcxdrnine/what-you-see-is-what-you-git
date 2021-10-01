start docker run --rm -p8000:8000 -p8001:8001 -p8002:8002^
	-v D:/dev/what-you-see-is-what-you-get/ml/model/repository:/models^
	nvcr.io/nvidia/tritonserver:21.09-py3 tritonserver^
	--model-repository=/models