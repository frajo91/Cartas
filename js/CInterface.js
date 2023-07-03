function CInterface(szTimeLeft){
    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosScoreText;
    var _pStartPosTimeText;
	var _pStartPosFullscreen;
	
    var _oTimeLeft;
    var _oTimeLeft; 
    var _oScore;
    var _oAudioToggle;
    var _szTimeLeft;
    var _oButExit;
    var _oScoreMultText;
	var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    this._init = function(szTimeLeft){
	_pStartPosTimeText = {x:(CANVAS_WIDTH/6)*2,y:75};
        _szTimeLeft = TEXT_TIMELEFT + szTimeLeft;
        _oTimeLeft = new CTLText(s_oStage, 
                    _pStartPosTimeText.x-250, _pStartPosTimeText.y, 500, 36, 
                    36, "left", COLOR_FONT_1, FONT_GAME, 1,
                    0, 0,
                   _szTimeLeft,
                    true, true, false,
                    false );
                    
        _oTimeLeft.setShadow(COLOR_SHADOWN_1, 2, 2, 2);


	_pStartPosScoreText = {x:(CANVAS_WIDTH/6)*4,y:75};
  
        _oScore = new CTLText(s_oStage, 
                    _pStartPosScoreText.x-250, _pStartPosScoreText.y, 500, 36, 
                    36, "center", COLOR_FONT_1, FONT_GAME, 1,
                    0, 0,
                   TEXT_SCORE + "0",
                    true, true, false,
                    false ); 
        
        _oScore.setShadow(COLOR_SHADOWN_1, 2, 2, 2);

        _oScoreMultText = new createjs.Text("X2", "150px "+FONT_GAME, COLOR_FONT_1);
        _oScoreMultText.textAlign = "center";
        _oScoreMultText.textBaseline = "alphabetic";
        _oScoreMultText.x = CANVAS_WIDTH/2;
        _oScoreMultText.y = CANVAS_HEIGHT/2;
        _oScoreMultText.shadow = new createjs.Shadow(COLOR_SHADOWN_1, 2, 2, 2);
        _oScoreMultText.scaleX = _oScoreMultText.scaleY = 0.1;
        _oScoreMultText.visible = false;
        s_oStage.addChild(_oScoreMultText);

        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x:CANVAS_WIDTH - (oSprite.width/2) - 20,y:(oSprite.height/2) + 20};
        var oSprite2 = s_oSpriteLibrary.getSprite('audio_icon');
        _pStartPosAudio = {x:CANVAS_WIDTH - (oSprite2.width/2)*2 - 10,y:(oSprite2.height/2) + 20};
		
        
        _oButExit = new CGfxButton(_pStartPosExit.x,_pStartPosExit.y,oSprite,s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){   
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite2,s_bAudioActive,s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            _pStartPosFullscreen = {x:_pStartPosAudio.x-oSprite.width - 20,y:_pStartPosAudio.y};
        }else{
                _pStartPosFullscreen = {x:_pStartPosExit.x-oSprite.width - 20,y:_pStartPosExit.y};
        }
		
	var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
		
	if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }

        if (_fRequestFullScreen && screenfull.enabled){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
		
	this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };
	
    this.refreshButtonPos = function(iNewX,iNewY){
        _oScore.setY(_pStartPosScoreText.y + iNewY);

        _oTimeLeft.setX(_pStartPosTimeText.x + iNewX);
        _oTimeLeft.setY(_pStartPosTimeText.y + iNewY);

        _oButExit.setPosition(_pStartPosExit.x - iNewX,iNewY + _pStartPosExit.y);
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }
		if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x - iNewX,_pStartPosFullscreen.y + iNewY);
        }
    };
    
    this.unload = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                _oAudioToggle.unload();
        }
		if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.unload();
        }
        _oButExit.unload();


	s_oInterface = null;
    };

    this.refreshScore = function(iScore){
        _oScore.refreshText(TEXT_SCORE + iScore);
    };
	
    this.showMultiplier  = function(iMult){
        _oScoreMultText.text = "X"+iMult;
        _oScoreMultText.visible = true;

        createjs.Tween.get(_oScoreMultText).to({scaleX:1,scaleY:1}, 300,createjs.Ease.cubicOut).call(function(){
                                                        createjs.Tween.get(_oScoreMultText).to({scaleX:0.1,scaleY:0.1}, 300,createjs.Ease.cubicIn).call(function(){
                                                                                                                                                _oScoreMultText.visible = false;
                                                                                                                                            }); 
                                                                                            });  
    };

    this.update = function(szTimeLeft){
        _oTimeLeft.refreshText(TEXT_TIMELEFT + szTimeLeft);
    };

    this._onExit = function(){
        s_oGame.unload(true);
    };
	
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this.resetFullscreenBut = function(){
	if (_fRequestFullScreen && screenfull.enabled){
		_oButFullscreen.setActive(s_bFullscreen);
	}
    };
    
    this._onFullscreenRelease = function(){
        if(s_bFullscreen) { 
		_fCancelFullScreen.call(window.document);
	}else{
		_fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();
    };
	
	
    s_oInterface = this;
    
    this._init(szTimeLeft);
    
    return this;
}

var s_oInterface = null;