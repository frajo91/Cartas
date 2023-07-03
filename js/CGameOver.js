function CGameOver(){
	var _oMsgTextBack;
	var _oMsgTextScore;
	var _oContinueButton; 
	var _oGroup;
        var _oBg;
        var _oListener;
	
	this._init = function(){
		_oGroup = new createjs.Container();
		_oGroup.alpha = 0;
		_oGroup.visible = false;
		s_oStage.addChild(_oGroup);
		
		_oBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
                _oListener = _oBg.on("click",function(){});
                _oGroup.addChild(_oBg);

		_oMsgTextBack = new CTLText(_oGroup, 
                    CANVAS_WIDTH/2-250, CANVAS_HEIGHT/2 - 100, 500, 50, 
                    50, "center", COLOR_FONT_2, FONT_GAME, 1,
                    0, 0,
                    TEXT_GAMEOVER,
                    true, true, false,
                    false );
               // _oMsgTextBack.setShadow("#000000",2,2,2);
   
	
		_oMsgTextScore = new CTLText(_oGroup, 
                    CANVAS_WIDTH/2-250, (CANVAS_HEIGHT/2) + 30, 500, 50, 
                    50, "center", COLOR_FONT_2, FONT_GAME, 1,
                    0, 0,
                    TEXT_TOTALSCORE+ " 0",
                    true, true, false,
                    false );
                    
            
		//_oMsgTextScore.setShadow("#000000",2,2,2);
		
		
		_oContinueButton =  new CTextButton(CANVAS_WIDTH/2,670,
                                            s_oSpriteLibrary.getSprite('but_menu_bg'),
                                            TEXT_PLAY_AGAIN,
                                            FONT_GAME_1,
                                            COLOR_FONT_2,
                                            "24",
                                            _oGroup);

        _oContinueButton.addEventListener(ON_MOUSE_UP, this.unload, this);
	}

    this.display = function(iScore){
        _oMsgTextScore.refreshText(TEXT_TOTALSCORE + " " + iScore);
		
	_oGroup.visible = true;
        createjs.Tween.get(_oGroup).to({alpha:1},250).call(function(){$(s_oMain).trigger("show_interlevel_ad");});
		
	$(s_oMain).trigger("save_score",iScore);
    };

    this.unload = function(){
        _oBg.on("click",_oListener);
        _oContinueButton.unload();
        s_oStage.removeChild(_oGroup);

        s_oGame.unload(false);
    };
	
    this._init();
}