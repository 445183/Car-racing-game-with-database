class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
      car1 = createSprite(175,200);
        car1.addImage("car1",car1_img);
        car2 = createSprite(375,200);
        car2.addImage("car2",car2_img);
        car3 = createSprite(575,200);
        car3.addImage("car3",car3_img);
        car4 = createSprite(775,200);
        car4.addImage("car4",car4_img);
        cars = [car1, car2, car3, car4];
    }
    
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    

    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;


      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
        

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        
        cars[index-1].x=  allPlayers[plr].xpos;
        
        cars[index-1].y = y;

        if (index === player.index){
          fill("red")
          ellipseMode(RADIUS);
          ellipse(cars[index-1].x,cars[index-1].y,40);
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
          player.update();
          
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distance -=10
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.xpos +=5
      player.update();
    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.xpos -=5
      player.update();
    }
    
    if(player.distance > 3420){
      gameState = 2;
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}
