function CMenu(){
    var _pStartPosAudio;
    var _pStartPosPlay;
    var _pStartPosCredits;
    var _pStartPosFullscreen;
    
    var _oBg;
    var _oButPlay;
    var _oButPlay2;
    var _oButCredits;
    var _oAudioToggle;
    var _oFade;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    this._init = function(){

        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'),getSize("Width"),getSize("Height"));

        s_oStage.addChild(_oBg);
	
	_pStartPosPlay = {x:((CANVAS_WIDTH/5)*4),y:CANVAS_HEIGHT - 200};
    _pStartPosPlay2 = {x:((CANVAS_WIDTH/5)*4)-70,y:CANVAS_HEIGHT - 200};
        var oSprite = s_oSpriteLibrary.getSprite('but_menu_bg');
        var oSprite1 = s_oSpriteLibrary.getSprite('but_inicio');

        _oButPlay2 = new CTextButton(_pStartPosPlay2.x,_pStartPosPlay.y,oSprite1,"",FONT_GAME,"White","24",s_oStage);
    //_oButPlay2.setScale(2);
        _oButPlay2.addEventListener(ON_MOUSE_UP, this._onButPlayRelease2, this);

        _oButPlay = new CTextButton(_pStartPosPlay.x,_pStartPosPlay.y,oSprite,TEXT_PLAY,FONT_GAME,"White","24",s_oStage);
	_oButPlay.setScale(2);
    _oButPlay.setVisible(false);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        
        var oSpriteCredits = s_oSpriteLibrary.getSprite('but_credits');
        _pStartPosCredits = {x:oSpriteCredits.width/2 + 10,y:oSpriteCredits.height/2 + 10};
        _oButCredits = new CGfxButton(_pStartPosCredits.x,_pStartPosCredits.y,oSpriteCredits,s_oStage);
        _oButCredits.addEventListener(ON_MOUSE_UP, this._onButCreditsRelease, this);
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height/2)- 20, y: (oSprite.height/2) + 20};            
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive,s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);   
            _pStartPosFullscreen = {x:_pStartPosAudio.x-oSprite.width/2 - 20,y:oSprite.height/2 + 20};
        }else{
             _pStartPosFullscreen = {x: CANVAS_WIDTH - (oSprite.height/2)- 20, y: (oSprite.height/2) + 20}; 
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
		
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        
        s_oStage.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha:0}, 1000).call(function(){_oFade.visible = false;});  
		
	this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };
    
    this.unload = function(){
        _oButPlay.unload(); 
        _oButPlay = null;
        _oButCredits.unload();
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.unload();
        }
        s_oStage.removeAllChildren();
    };
	
    this.refreshButtonPos = function(iNewX,iNewY){

        _oButPlay.setPosition(_pStartPosPlay.x,_pStartPosPlay.y - iNewY);
        _oButPlay2.setPosition(_pStartPosPlay2.x,_pStartPosPlay2.y - iNewY);
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }
        
	if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x - iNewX,_pStartPosFullscreen.y + iNewY);
        }
        
        _oButCredits.setPosition(_pStartPosCredits.x + iNewX,_pStartPosCredits.y + iNewY);        
    };

    
    
    this._onButPlayRelease = function(){
        this.unload();
	
        $(s_oMain).trigger("start_session");
        s_oMain.gotoGame();
	s_oMenu = null;
    };

    this._onButPlayRelease2 = function(){
        _oButPlay2.setVisible(false); 
        
        _oButPlay.setVisible(true)
    };
    
    this._onButCreditsRelease = function(){
        new CCredits();
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
	
    s_oMenu = this;
    
    this._init();
}

var s_oMenu = null;