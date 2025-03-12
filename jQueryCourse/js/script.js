// $(function() {
//   // jQuery goes here...

//   // Uncomment this line to fade out the red box on page load
//   $(".red-box").fadeOut(5000);

//   var galleryImg = $(".gallery").find("img").first();
//   var images = [
//       "images/img1.jpg",
//       "images/img2.jpg",
//       "images/img3.jpg"
//   ];

//   var i = 0;
//   setInterval(function(){
//          //i = (i+1)% images.length; 0,1,2,0,1,2,0,1,2..... we can give this here or
//       galleryImg.fadeOut(function(){
//           i = (i+1)% images.length; //here as well...
//           $(this).attr("src",images[i]);
//           $(this).fadeIn();
//       });
//       console.log(galleryImg.attr("src"));
//   }, 2000);

//   });

$(function(){
    var galleryItems = $(".gallery").find("img");
    galleryItems.css({"width":"33%","opacity":"0.7"});

    galleryItems.mouseenter(function(){
        $(this).stop().fadeTo(500,1); //0.5 second animation with 100% opacity
    });

    galleryItems.mouseleave(function(){
        $(this).stop().fadeTo(500,0.7); //0.5 second animation with 70% opacity
    });

    galleryItems.click(function(){
        var source = $(this).attr("src");
        var newImage = $("<img>").attr("src",source).css("width","100%");
        $(".lightbox").empty().append(newImage).fadeIn(2000);
    });

    $(".lightbox").click(function(){
        $(this).stop().fadeOut();
    });

    var ARROW_RIGHT = 39;
    $("html").keydown(function(event){
        if(event.which == ARROW_RIGHT){
            $(".blue-box").stop().animate({"margin-left":"+=10px"},10); //50 is speed of animation
        }
    });
    
    var form = $("#form");
    enableFastFeedback(form);

    $("#form").submit(function(event){
        var name = $("#name").val();
        var password = $("#password").val();
        var message = $("#message").val();
        var checked = $("#checkbox").is(":checked");

        validateName(name,event);
        validatePass(password,event);
        validateMsg(message,event);
        validateCb(checked,event);
    })

    function validateName(name, event){
        if(!isValidName(name)){
            $("#name-feedback").text("Please enter at least two characters");
            event.preventDefault();
        } else{
            $("#name-feedback").text("");
        }
    }

    function isValidName(name){
        return name.length >= 2;
    }

    function validatePass(password, event){
        if(!isValidPass(password)){
            $("#password-feedback").text("Please enter at least 8 characters and 1 number");
            event.preventDefault();
        } else{
            $("#password-feedback").text("");
        }
    }

    function isValidPass(password){
        return password.length >= 8 && /.*[0-9].*/.test(password);//test() used to test for match in string given
    }

    function validateMsg(message, event){
        if(!isValidMsg(message)){
            $("#message-feedback").text("Please enter at least 1 character");
            event.preventDefault();
        } else{
            $("#message-feedback").text("");
        }
    }

    function isValidMsg(message){
        return message.trim().length != 0;
    }

    function validateCb(checked, event){
        if(!checked){
            $("#checked-feedback").text("Please check the checkbox");
            event.preventDefault();
        } else{
            $("#checked-feedback").text("");
        }
    }

    function enableFastFeedback(formEle){
        var nameIn = formEle.find("#name");
        var passIn = formEle.find("#password");
        var msgIn = formEle.find("#message");
        var cbIn = formEle.find("#checkbox");

        nameIn.blur(function(event){
            var name = $(this).val();
            validateName(name,event);

            if(!isValidName(name)){
                $(this).css({"box-shadow":"0 0 4px red",
                    "border":"2px solid red"
                });
            }else{
                $(this).css({"box-shadow":"0 0 4px green",
                    "border":"2px solid green"
                });
            }
        });

        passIn.blur(function(event){
            var pass = $(this).val();
            validatePass(pass,event);
        
            if(!isValidPass(pass)){
                $(this).css({"box-shadow":"0 0 4px red",
                    "border":"2px solid red"
                });
            }else{
                $(this).css({"box-shadow":"0 0 4px green",
                "border":"2px solid green"
                });
            }
        });

        msgIn.blur(function(event){
            var msg = $(this).val();
            validateMsg(msg,event);
        
            if(!isValidMsg(msg)){
                $(this).css({"box-shadow":"0 0 4px red",
                    "border":"2px solid red"
                });
            }else{
                $(this).css({"box-shadow":"0 0 4px green",
                "border":"2px solid green"
                });
            }
        });

        cbIn.change(function(event){
            var cb = $(this).is(":checked");
            validateCb(cb,event);
        
            if(!cb){
                $(this).add("label[for='cb']").css({"box-shadow":"0 0 4px red",
                    "border":"2px solid red"
                });
            }else{
                $(this).add("label[for='cb']").css({"box-shadow":"0 0 4px green",
                "border":"2px solid green"
                });
            }
        });
    }


});