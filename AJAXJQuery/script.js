$(function(){
    var flickrApiUrl = "https://www.flickr.com/services/feeds/photos_public.gne?jsoncallback=?"; 
    // //with api we need to append ?jsoncallback=? at the end

    var pokeApiUrl = "https://pokeapi.co/api/v2/generation/7";
    var pokemonByName = "https://pokeapi.co/api/v2/pokemon/"

    $.getJSON(flickrApiUrl,{
        tags : "aurora",
        tagmode : "any",
        format : "json"
    }).done(function(data){
        //console.log(data);
        $.each(data.items,function(index,item){
            $("<img>").attr("src",item.media.m).appendTo("#flickr-div");
            //by default it gives 20 images but if you want to limit it then use this
            //if(index == 4){
            //  return false;  each() will stop iteration when we return false
            //}
        });
    }).fail(function(){
        alert("Provide correct api");
    })

    $.getJSON(pokeApiUrl).done(function(data){
        console.log(data);
        $.each(data.pokemon_species,function(index,pokemon){
            var name = pokemon.name;
            var link = $("<a>").attr("id",name).attr("href","#").append($("<strong>").text(name));

            link.click(function(event){
                $.getJSON(pokemonByName + pokemon.name).done(function(details){  //as data variable is used before we use datails now
                    console.log(details);
                    var pokeDiv = $("#poke-details");
                    pokeDiv.empty();
                    pokeDiv.append("<h2>"+name+"</h2>");
                    pokeDiv.append("<img src='"+details.sprites.front_default+"'>");
                    pokeDiv.append("<img src='"+details.sprites.back_default+"'>");
                    pokeDiv.append("<img src='"+details.sprites.front_shiny+"'>");
                    pokeDiv.append("<img src='"+details.sprites.back_shiny+"'>");
                    event.preventDefault();
                });
            });

            $("<p>").html("Pokemon at "+index+" is ").append(link).appendTo("#poke-div");
        });

        }).fail(function(){
            alert("Provide correct api");
        });

});