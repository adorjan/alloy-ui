AUI.add("aui-tabs-base",function(s){var i=s.Lang,k=s.getClassName,g="tab",y="tabview",B="boundingBox",p="contentBox",f="contentNode",v=k(g),d=k(g,"content"),m=k(g,"label"),e=k(g,"disabled"),x=k(g,"active"),w=k(y,"content"),q=k(y,"content","item"),j=k(y,"list"),a=k("widget","hd"),h=k("widget","bd"),r=[j,a].join(" "),D=[w,h].join(" "),z=k("helper-hidden"),C="<div></div>",u="<ul></ul>",o="<em></em>",n=u,t=C,c=C;var l=s.Component.create({NAME:g,ATTRS:{label:{lazyAdd:false,valueFn:function(){var A=this;var F=A.get(B);var E=F.one("."+m);var G;if(E){G=E.html();A.set("labelNode",E);}else{G=F.html();F.html("");}return G;},setter:function(F){var A=this;var E=A.get("labelNode");E.html(F);return F;}},labelNode:{valueFn:function(){var A=this;var E=A.get(B).one("."+m);if(!E){E=A._createDefaultLabel();}A.get(p).appendChild(E);return E;},setter:function(F){var A=this;var E=s.one(F);if(!E){E=A._createDefaultLabel();A.get(p).appendChild(E);}E.addClass(m);return E;}},contentNode:{value:null,setter:function(F){var A=this;var E=s.one(F);if(!E){E=A._createDefaultContentEl();A.get(p).prepend(E);E.addClass(q);}var G=A.get(f);if(G){if(!A.get("active")){E.addClass(z);}var H=E.html();A.set("content",H);}return E;}},content:{lazyAdd:false,valueFn:function(){var E=this;var F="";var A=E.get(f);if(A){F=A.html();}return F;},setter:function(F){var A=this;var E=A.get(f);var G=E.html();if(G!=F){E.html(F);}return F;}},active:{valueFn:function(){var A=this;return A.get(B).hasClass(x);},validator:function(E){var A=this;return i.isBoolean(E)&&!A.get("disabled");},setter:function(G){var A=this;var F="addClass";var E=A.get(B);if(G===false){F="removeClass";}A.StateInteraction.set("active",G);E[F](x);A.set("contentVisible",G);return G;}},disabled:{valueFn:function(){var A=this;return A.get(B).hasClass(e);},setter:function(G){var A=this;var F="addClass";var E=A.get(B);if(G===false){F="removeClass";}E[F](e);return G;}},contentVisible:{value:false,setter:function(G){var E=this;var F="addClass";var A=E.get(f);if(G===true){F="removeClass";}if(!E.get("active")){A[F](z);}return G;}},tabView:{value:null}},prototype:{BOUNDING_TEMPLATE:"<li></li>",CONTENT_TEMPLATE:"<span></span>",bindUI:function(){var A=this;var E=A.get(B);E.plug(s.Plugin.StateInteraction,{bubbleTarget:A});E.StateInteraction.on("click",A._onActivateTab,A);A.StateInteraction=E.StateInteraction;A.get("labelNode").on("click",A._onLabelClick,A);},_createDefaultLabel:function(){var A=this;return s.Node.create(o);},_createDefaultContentEl:function(){var A=this;return s.Node.create(t);},_onActivateTab:function(F){var A=this;F.halt();if(A.get("disabled")){return;}var E=A.get("tabView");E.set("activeTab",A);},_onLabelClick:function(A){A.preventDefault();}}});s.Tab=l;var b=s.Component.create({NAME:y,ATTRS:{listNode:{value:null,setter:function(F){var A=this;var E=s.one(F);if(!E){E=A._createDefaultList();}A.get(p).prepend(E);E.addClass(r);return E;}},contentNode:{value:null,setter:function(F){var A=this;var E=s.one(F);if(!E){E=A._createDefaultContentContainer();A.get(p).appendChild(E);E.addClass(D);}return E;}},items:{value:[]},activeTab:{value:null,setter:function(F){var E=this;var A=E.get("activeTab");if(A){if(A!=F){A.set("active",false);}else{if(A.get("disabled")){F=null;}}}return F;}}},prototype:{renderUI:function(){var A=this;A.after("activeTabChange",A._onActiveTabChange);A._renderContentSections();A._renderTabs();},addTab:function(E,G){var K=this;var J=K.getTab(G);var I=K.get("items");if(i.isUndefined(G)){G=s.Array.indexOf(I,E);}var L=G>-1;if(!L){G=I.length;I.splice(G,0,E);}if(!K.get("rendered")&&!L){return;}if(!(E instanceof l)){E=new l(E);I.splice(G,1,E);}var F=K.get("listNode");E.render(F);E.set("tabView",K);if(J){F.insert(E.get(B),J.get(B));}else{F.appendChild(E.get(B));}var A=E.get(f);var H=K.get(f);if(!H.contains(A)){H.appendChild(A);}if(E.get("active")){K.set("activeTab",E);}},deselectTab:function(E){var A=this;if(A.getTab(E)===A.get("activeTab")){A.set("activeTab",null);}},disableTab:function(E){var A=this;var F;if(i.isNumber(E)){F=A.getTab(E);}else{F=E;}if(F){F.set("disabled",true);}},enableTab:function(E){var A=this;var F;if(i.isNumber(E)){F=A.getTab(E);}else{F=E;}if(F){F.set("disabled",false);}},getTab:function(E){var A=this;return A.get("items")[E];},getTabIndex:function(F){var A=this;var E=A.get("items");return s.Array.indexOf(E,F);},removeTab:function(G){var A=this;var H;if(i.isNumber(G)){H=A.getTab(G);}else{H=G;G=A.getTabIndex(H);}if(H){var E=A.get("items");var F=E.length;if(H===A.get("activeTab")){if(F>1){if(G+1===F){A.selectTab(G-1);}else{A.selectTab(G+1);}}else{A.set("activeTab",null);}}H.destroy();E.splice(G,1);}},selectTab:function(F){var A=this;var E=A.getTab(F);A.set("activeTab",E);},_createDefaultList:function(){var A=this;return s.Node.create(n);},_createDefaultContentContainer:function(){var A=this;return s.Node.create(c);},_onActiveTabChange:function(E){var A=this;var F=E.prevVal;var G=E.newVal;if(G){G.set("active",true);}if(G!=F){if(F){F.set("active",false);}}},_renderContentSections:function(){var A=this;A._renderSection("list");A._renderSection("content");},_renderSection:function(E){var A=this;A.get(E+"Node");},_renderTabs:function(){var L=this;var H=L.get(f);var F=L.get("listNode");var J=F.get("children");var E=H.get("children");var I=L.get("items");var K="."+d;J.each(function(P,O,N){var M={boundingBox:P,contentBox:P.one(K),contentNode:E.item(O)};I.splice(O,0,M);});var A=I.length;for(var G=0;G<I.length;G++){L.addTab(I[G]);}if(!L.get("activeTab")){L.selectTab(0);}}}});s.TabView=b;},"@VERSION@",{skinnable:true,requires:["aui-component","aui-state-interaction"]});AUI.add("aui-tabs-menu-plugin",function(m){var f=m.Lang,i=m.getClassName,d="tab",w="tabview",g="tabviewmenu",c="TabViewMenuPlugin",b="contentNode",v="host",j="listNode",a="rendered",r=i(d),h=i(w,"list"),s=i(w,"list","content"),o=i(g,"item"),p=i(g,"item","label"),n=i(g,"list"),k=i(g,"trigger"),u=i(w,"wrapper"),l="first",q="last",t="<ul></ul>",y='<li class="'+o+'" data-index="{0}"><a href="javascript:;" class="'+p+'">{1}</a></li>',e="<div></div>";
var x=m.Component.create({NAME:c,NS:g,EXTENDS:m.Plugin.Base,prototype:{initializer:function(){var z=this;z.afterHostMethod("renderUI",z.renderUI);z.afterHostMethod("bindUI",z.bindUI);z.afterHostMethod("addTab",z.addTab);z.afterHostMethod("removeTab",z.removeTab);z.afterHostMethod("selectTab",z.selectTab);z.afterHostMethod("_onActiveTabChange",z._onActiveTabChange);z.afterHostMethod("_renderTabs",z._renderTabs);z._updateMenuTask=m.debounce(z._updateMenu,1,z);z._updateUITask=m.debounce(z._updateUI,1,z);},bindUI:function(){var z=this;var A=z.get(v);m.on("windowresize",z._onWindowResize,z);},renderUI:function(){var z=this;var B=z.get(v);var A=B.get(j);var C=z._wrapper;z._listNodeOuterWidth=(parseFloat(A.getComputedStyle("marginLeft"))+parseFloat(C.getComputedStyle("borderLeftWidth"))+parseFloat(A.getComputedStyle("paddingLeft"))+parseFloat(A.getComputedStyle("paddingRight"))+parseFloat(C.getComputedStyle("borderRightWidth"))+parseFloat(A.getComputedStyle("marginRight")));z._updateUITask();},addTab:function(B,A){var z=this;var C=z.get(v);if(C.get(a)){z._updateUITask();}},removeTab:function(A){var z=this;var B=z.get(v);if(B.get(a)){z._updateUITask();}},selectTab:function(A){var z=this;z._updateMenuTask();z.fire("selectTab",{index:A});},_hideMenu:function(){var z=this;var B=z.get(v);var A=B.get(j);A.all("."+r).show();if(z._menuOverlay){z._menuOverlay.hide();z._triggerNode.hide();}},_onActiveTabChange:function(A){var z=this;z._updateMenuTask();},_onWindowResize:function(B){var A=this;if(A._menuNode){var z=A.get(v).get(b);A._contentWidth=z.get("offsetWidth")-A._listNodeOuterWidth;A._updateMenuTask();}else{A._updateUITask();}},_renderMenu:function(){var z=this;var A=m.Node.create(e);var B=m.Node.create(t);A.addClass(k);z._wrapper.append(A);var D=new m.OverlayContext({align:{points:["tr","br"]},contentBox:B,cancellableHide:true,cssClass:n,hideDelay:1000,hideOn:"mouseout",showDelay:0,showOn:"click",trigger:A}).render();D.refreshAlign();z._menuNode=B;z._triggerNode=A;z._menuOverlay=D;z.after("selectTab",D.hide,D);var C=z.get(v);B.delegate("click",function(F){var E=F.currentTarget.get("parentNode").attr("data-index");C.selectTab(E);},"li a");},_renderTabs:function(){var A=this;var E=A.get(v);var z=E.get(b);var D=E.get(j);D.removeClass(h);D.addClass(s);var C=E._createDefaultContentContainer();C.addClass(h);var B=E._createDefaultContentContainer();B.addClass(u);B.append(C);z.insert(B,D);C.append(D);A._wrapper=B;A._content=C;},_updateMenu:function(){var N=this;var O=N.get(v);var I=N._menuNode;var C=N._wrapper;if(I){var M=true;var G=C.get("offsetWidth");var J=N._itemsWidth;if(J[J.length-1]>N._contentWidth){var H=O.get(j);var L=H.all("."+r);var F=O.getTabIndex(O.get("activeTab"));var E=(F!=0?J[F]-J[F-1]:0);var z=N._contentWidth;var K=O.selectTab;var D=[];var B=[];L.each(function(Q,P,T){var S=(P<F?E:0);if(P!=F&&J[P]+S>z){Q.hide();D[0]=P;D[1]=Q.get("text");var R=f.sub(y,D);B.push(R);M=false;}else{Q.show();}});I.setContent(B.join(""));var A=I.all("li");A.first().addClass(l);A.last().addClass(q);}if(M){N._hideMenu();}else{N._triggerNode.show();}}},_updateUI:function(){var A=this;var D=A.get(v);A._hideMenu();var z=D.get(b);var C=D.get(j);var B=C.all("."+r);A._contentWidth=z.get("offsetWidth")-A._listNodeOuterWidth;A._itemsWidth=[];var G=A._itemsWidth;var E=(parseFloat(C.getComputedStyle("paddingLeft"))+parseFloat(C.getComputedStyle("paddingRight")));var F=B.size()-1;B.each(function(I,H,K){var L=(parseFloat(I.getComputedStyle("marginRight"))+parseFloat(I.getComputedStyle("marginLeft")));var J=H-1;if(H>0){G[J]=E+L+I.get("offsetLeft");}if(H==F){G[H]=G[J]+I.get("offsetWidth");}});if(G[G.length-1]>A._contentWidth){if(!A._menuOverlay){A._renderMenu();}A._updateMenuTask();}}}});m.namespace("Plugin").TabViewMenu=x;},"@VERSION@",{requires:["aui-component","aui-state-interaction","aui-tabs-base","aui-overlay-context","plugin"]});AUI.add("aui-tabs",function(a){},"@VERSION@",{skinnable:true,use:["aui-tabs-base","aui-tabs-menu-plugin"]});