$(document).ready(function(){
    $("#add-btn").click(function(){
        var inputText = $("#addTask").val().trim();
        if(inputText === ""){
            alert("Please enter a task!!")
        }
        else{
            var list = $("<li></li>").text(inputText);
            var complete = $("<button style='margin-left: 20px; margin-bottom: 20px'>✅</button>");
            var del = $("<button style='margin-left: 20px; margin-bottom: 20px'>❌</button>");
            list.append(complete).append(del);
            $("#tasks-list").append(list);
            $("#addTask").val("");
        }
    });
    $(document).on("click", "button:contains('✅')",function(){
        $(this).parent().toggleClass("completed");
    });
    $(document).on("click", "button:contains('❌')", function(){
        $(this).parent().remove();
    });
    $("#toggle-btn").click(function(){
        $("#tasks-list").toggle();
    });
});