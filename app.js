const SCALE = 3.544;
var Page = function(){
  this.init = function(){
    console.log("init");
    const _this = this;
    $("#btnSvgSelect").change(function(ev){
      //console.log(ev);
      const f = ev.target.files[0];
      //ファイル読み込み
      var reader = new FileReader();
      reader.addEventListener('load', function(e){
        _this.parseXML(f.name,e);
      }, false);
      reader.readAsText(f);
    });
  };

  //XMLをパースする
  this.parseXML = function(name,e){
    //console.log( e.target.result );
    var parser = new DOMParser();
    var dom = parser.parseFromString(e.target.result, 'text/xml');
    //console.log(dom.children);

    //svgにgタグを追加する
    var svg = dom.children[0];
    var g = document.createElement('g');
    g.setAttribute("transform","scale("+SCALE+")");
    g.innerHTML = svg.innerHTML;
    svg.innerHTML = "";
    svg.appendChild(g);

    console.log(dom);

    //blobを作成
    var txt = (new XMLSerializer()).serializeToString(dom);
    var blob = new Blob([txt],{type:"image/svg+xml"});

    //ダウンロードさせる
    var a = document.createElement('a');
    a.download = name;
    a.target   = '_blank';
    a.href = window.webkitURL.createObjectURL(blob);
    a.click();
  };
};

var p = new Page();
$(function(){
  p.init();
});
