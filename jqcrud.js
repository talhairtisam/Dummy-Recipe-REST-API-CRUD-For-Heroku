$(function(){
    loadRecipies();
    $("#recipies").on("click",".btn-danger",handleDelete);
    $("#addRecipie").click(addRecipie);
    $("#recipies").on("click",".btn-warning",handleUpdate);
    $("#updateSave").click(function(){
        var id = $("#updateId").val();
        var title = $("#updateTitle").val();
        var body = $("#updateBody").val();
        $.ajax({
            url:"https://usman-recipes.herokuapp.com/api/recipes/"+id,
            method: "PUT",
            data:{title,body},
            success: function(){
                loadRecipies();
                $("#updateModel").modal("hide");
            }
        });
        
    })
});

function loadRecipies(){
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes",
        method: "GET",
        error:function(){
            var recipies = $("#recipies");
            recipies.html("An Error has occure");
        },
        success: function(response){
            console.log(response);
            var recipies = $("#recipies");
            recipies.empty();
            for(var i=0;i<response.length; i++){
                recipies.append(`<div class="recipie" data-id="${response[i]._id}"><h3>${response[i].title}</h3><p><button class="btn btn-danger btn-sm float-right">Delete</button><button class="btn btn-warning btn-sm float-right">Edit</button>${response[i].body}</p></div>`);
                // recipies.append("<div><h3>"+ response[i].title +"</h3><p>"+ response[i].body +"</p></div>");
            }
            
        }
    });
}

function handleDelete(){
    var btn = $(this);
    var parentDiv = btn.closest(".recipie");
    let id = parentDiv.attr("data-id");
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes/"+id,
        method: "DELETE",
        success: function(){
            loadRecipies();
        }
    });
};

function addRecipie(){
    var title = $("#title").val();
    var body = $("#body").val();
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes",
        method: "POST",
        data:{title,body},
        success: function(){
            loadRecipies();
        }
    });
    $("#title").val("");
    $("#body").val("");
}
function handleUpdate(){
    var btn = $(this);
    var parentDiv = btn.closest(".recipie");
    let id = parentDiv.attr("data-id");
    $.get("https://usman-recipes.herokuapp.com/api/recipes/"+id,function(response){
        $("#updateId").val(response._id);
        $("#updateTitle").val(response.title);
        $("#updateBody").val(response.body);
        $("#updateModel").modal("show");
    });
}