var settings = {
	"url": "https://api.cdek.ru/v2/calculator/tarifflist",
	"method": "POST",
	"timeout": 0,
	"headers":
		{
			"Authorization": "Bearer AaLp7rM6fWJjYUwIFLvSlpc8XZnx5UQO-Aiwkgk6qfRTcSLT7l5ZabhSZMVcn14GP",
			"Content-Type": "application/json"
		}
	,
	"data": JSON.stringify({
		"from_location":
			{
				"code": 270
			}
		,
		"to_location":
			{
				"code": 44
			}
		,
		"packages": [
			{
				"weight": 4000,
				"height": 10,
				"length": 10,
				"width": 10
			}
		]
	}),
};
$.ajax(settings).done(function (response) {
		console.log(response);
	}
);
