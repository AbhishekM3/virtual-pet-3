class Food{
    constructor(){
      
       
       this.foodStock = 0;
       this.lastFed ;
       this.image = loadImage("images/milk.png");
       

       
    }

   
    updateFoodStock(foodStock){

      this.foodStock = foodStock;
    }

    getFedTime(lastFed){

       this.lastFed = lastFed;
    }



    detuctFood(){

       if(this.foodStock>0){
           this.foodStock = this.foodStock-1;
       }
    }
    
    getFoodStock(){

     return this.foodStock; 

    }

    garden(){
       
      background(g_i,550,500);
    }
     
    bedroom(){

      background(b_i,550,500);

    }

    washroom(){

      background(washroomImg,550,500);

    }

    display(){
       

      var x= 80,y=100;
      imageMode(CENTER);
      image(this.image,670,320,70,70);

      if(this.foodStock != 0){

         for (var i=0; i<this.foodStock; i++){
            if(i%10==0){
               x = 80;
               y = y+50;
            }

            image(this.image,x,y,50,50);
            x = x+30;
            y = y;
         }
         

      }

        

    }


}