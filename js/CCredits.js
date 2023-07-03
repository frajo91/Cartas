function CCredits(){
    
    var _oPanelContainer;
    var _oButExit;
    var _oLogo;
    var _oPanel;
    var _oListener;
    
    var _pStartPanelPos;
    
    this._init = function(){
        _oPanelContainer = new createjs.Container();        
        s_oStage.addChild(_oPanelContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite('msg_box');
        _oPanel = createBitmap(oSprite);        
        _oListener = _oPanel.on("click",this._onLogoButRelease);
        _oPanel.regX = oSprite.width/2;
        _oPanel.regY = oSprite.height/2;
        _oPanelContainer.addChild(_oPanel);
        
        _oPanelContainer.x = CANVAS_WIDTH/2;
        _oPanelContainer.y = CANVAS_HEIGHT/2;  
        _pStartPanelPos = {x: _oPanelContainer.x, y: _oPanelContainer.y};

        var oTitle = new createjs.Text(TEXT_DEVELOPED," 30px "+FONT_GAME, "#ffffff");
        oTitle.y = -80;
        oTitle.textAlign = "center";
        oTitle.textBaseline = "middle";
        oTitle.lineWidth = 300;
        _oPanelContainer.addChild(oTitle);

        var oLink = new createjs.Text("SHARING EXPERTISE"," 34px "+FONT_GAME_1, "#ffffff");
        oLink.y = 70;
        oLink.textAlign = "center";
        oLink.textBaseline = "middle";
        oLink.lineWidth = 300;
        _oPanelContainer.addChild(oLink);
        
        var oSprite = s_oSpriteLibrary.getSprite('logo_ctl');
        _oLogo = createBitmap(oSprite);
        _oLogo.regX = oSprite.width/2;
        _oLogo.regY = oSprite.height/2;
        _oPanelContainer.addChild(_oLogo);
      
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _oButExit = new CGfxButton(440, -228, oSprite, _oPanelContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this.unload, this);
        
    };
    
    this.unload = function(){
        
        _oButExit.setClickable(false);
        
         s_oStage.removeChild(_oPanelContainer);

        _oButExit.unload();
         
        
        _oPanel.on("click",_oListener);
    };
    
    this._onLogoButRelease = function(){
       // window.open("http://www.codethislab.com/index.php?&l=en");
    };

    
    this._init();
    
    
};


