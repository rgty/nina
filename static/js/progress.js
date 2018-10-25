$(document).ready(function(){
	
	$("form").submit(function(e){

		e.preventDefault();

		var formData = new FormData();
		var file = $("input[type=file]")[0].files[0];

		formData.append("section", "general");
		formData.append("action", "previewImg")
		formData.append("media", file);

		$.ajax({
			type:"POST",
			url:"/upload",
			data:formData,
			processData:false,
			contentType:false,
			success:function(){
				progressFill(0);
			},
			xhr:function(){
				var xhr = new window.XMLHttpRequest();
				xhr.upload.addEventListener("progress", function(e){
					if(e.lengthComputable){
						var percent = Math.round((e.loaded/e.total)*100);
						progressFill(percent);
					}
				});
				return xhr;
			}
		});
	});

	function progressFill(percent){
		$(".progress-bar").attr('aria-valuenow', percent);
		$(".progress-bar").css('width', percent+"%");
		$(".progress-bar").text(percent+"%");
	};

});