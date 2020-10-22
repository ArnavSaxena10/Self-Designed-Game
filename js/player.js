class Player{
    constructor(){
        this.sprite=createSprite(width/2-100,height/2+125,100,100);
        this.sprite.addAnimation("walk",viperWalk);
        this.sprite.addAnimation("attack",viperAttack);
        this.sprite.addAnimation("attackExtra",viperAttackExtra);
        this.sprite.addAnimation("death",viperDeath);
        this.sprite.scale=1.5;
        //this.sprite.debug=true;
        this.sprite.setCollider("rectangle",-20,20,this.sprite.width-200,this.sprite.height-200);
    }

    control(){
        
        if(keyIsDown(UP_ARROW)){
            this.sprite.y-=5;
        }

        if(keyIsDown(DOWN_ARROW)){
            this.sprite.y+=5;
        }

        if(keyIsDown(LEFT_ARROW)){
            this.sprite.x-=5;
        }

        if(keyIsDown(RIGHT_ARROW)){
            this.sprite.x+=5;
        }

        
    }
}