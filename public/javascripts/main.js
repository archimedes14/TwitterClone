(function() {
	$.get("/tweets/all", {}, function(data) {
				for(var i in data) 	{
					$(".allTweets").append("<pre> User : "+data[i].owned+" tweets <br>"+data[i].content+"<br>"+data[i].createdAt+"</pre>");
				}
			}, "json");
})(); 

maxRemChars = 140; 
remChars=maxRemChars;
var currentChars;
$(".tweet").on("keydown", function(e) {
	currentChars = $(".tweet").val().length; 
	temp=currentChars;
	if (e.keyCode === 8 || e.keyCode === 46) 
	{	
		if(currentChars>0)
		currentChars--;
	}
	else if( e.keyCode !== 37 && e.keyCode !== 38 && e.keyCode !== 39 && e.keyCode !== 40 && e.keyCode !== 16 && e.keyCode !== 17 && e.keyCode !== 18)
	{	
		currentChars++;
	
	}
			remChars=maxRemChars-(currentChars);
	
		if(remChars>=0)
		$(".remChar").text(remChars+" characters remaining");
		else 
		{
			if (e.keyCode !== 8 && e.keyCode !== 46 && e.keyCode !== 37 && e.keyCode !== 38&& e.keyCode !== 39 && e.keyCode !== 40)
		 	e.preventDefault();
		$(".remChar").text("Limit Exceeded");
		}
	
});


$(".tweet").on("keyup", function(e) {
 
	if ((e.keyCode === 8 || e.keyCode === 46) && temp===$(".tweet").val().length) 
	{
		remChars=maxRemChars-temp;
		$(".remChar").text(remChars+" characters remaining");
	}
});

$(".submit").on("click", function(e) {
	e.preventDefault();
	var newTweet = $(".tweet").val(); 

	$.post("/tweets/save", {"newTweet":newTweet}, function(callback) {
		if (callback==="1") {
			$.get("/tweets/all", {}, function(data) {
				$(".allTweets").empty();
				for(var i in data) 	{
					$(".allTweets").append("<pre> User : "+data[i].owned+" tweets <br>"+data[i].content+"<br>"+data[i].createdAt+"</pre>");
				}
			}, "json");
		}
		
	}, "html"); 

	$(".tweet").val("");
	$(".remChar").text("140 characters remaining.");	
});