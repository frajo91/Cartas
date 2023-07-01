function CVictory(){
	var _oContinueButton; 
	var _oMsgText;
	var _oMsgTotalScore;
	var _oGroup;
	
	this._init = function(){
		_oGroup = new createjs.Container();
		_oGroup.alpha = 0;
		_oGroup.visible = false;
		s_oStage.addChild(_oGroup);
		
		var oBg = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
                _oGroup.addChild(oBg);
                
		_oMsgText = new CTLText(_oGroup, 
                    CANVAS_WIDTH/2-250, CANVAS_HEIGHT/2 - 110, 500, 38, 
                    38, "center", "#fff", FONT_GAME, 1,
                    0, 0,
                    TEXT_VICTORY,
                    true, true, false,
                    false );

		_oMsgText.setShadow("#000000", 3, 3, 2);

		_oMsgTotalScore = new CTLText(_oGroup, 
                    CANVAS_WIDTH/2-250, (CANVAS_HEIGHT/2)-20, 500, 100, 
                    48, "center", "#fff", FONT_GAME, 1,
                    0, 0,
                    TEXT_TOTALSCORE,
                    true, true, true,
                    false );
                    
		_oMsgTotalScore.setShadow("#000000", 2, 2, 2);

		
		
		
		_oContinueButton =  new CTextButton(CANVAS_WIDTH/2,670,
                                            s_oSpriteLibrary.getSprite('but_menu_bg'),
                                            TEXT_PLAY_AGAIN,
                                            FONT_GAME,
                                            "White",
                                            "24",
                                            _oGroup);
        _oContinueButton.addEventListener(ON_MOUSE_DOWN, this.unload, this);
	};

    this.display = function(iTotalScore){
        _oMsgTotalScore.refreshText(TEXT_TOTALSCORE + "\n" + iTotalScore);
		
	_oGroup.visible = true;
        createjs.Tween.get(_oGroup).to({alpha:1},250).call(function(){$(s_oMain).trigger("show_interlevel_ad");});;
		
	$(s_oMain).trigger("save_score",iTotalScore);
    };

    this.unload = function(){
        _oContinueButton.unload();
        s_oStage.removeChild(_oGroup);

        s_oGame.unload(false);
    };
	
	this._init();
}