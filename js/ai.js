class AI{
    constructor(){
        this.sprite=createSprite(width/2+100,height/2+125,100,100);
        this.sprite.addAnimation("walk",kaboonaWalk);
        this.sprite.addAnimation("attack",kaboonaAttack);
        this.sprite.addAnimation("attackExtra",kaboonaAttackExtra);
        this.sprite.addAnimation("death",kaboonaDeathImg);
        this.sprite.addAnimation("finalDeath",kaboonaDeath);
        this.sprite.scale=1.5;
        //this.sprite.debug=true;
        this.sprite.setCollider("rectangle",20,20,this.sprite.width-200,this.sprite.height-200);
    }

    control(){

        if(viper.sprite.x+15<this.sprite.x){
            this.sprite.x-=1;
        }

        if(viper.sprite.x+15>this.sprite.x){
            this.sprite.x+=5;
        }

        if(viper.sprite.y<this.sprite.y){
            this.sprite.y-=1;
        }

        if(viper.sprite.y>this.sprite.y){
            this.sprite.y+=1;
        }
    }
}