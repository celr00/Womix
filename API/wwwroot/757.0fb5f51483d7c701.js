"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[757],{3757:(F,u,c)=>{c.r(u),c.d(u,{ProductModule:()=>I});var l=c(6895),a=c(2559),g=c(4020),t=c(1571),d=c(5528),p=c(433),h=c(7696),v=c(9219);const f=["search"];function P(o,i){if(1&o&&(t.TgZ(0,"option",19),t._uU(1),t.qZA()),2&o){const e=i.$implicit,r=t.oxw(2);t.Q6J("selected",r.params.sort===e.value)("value",e.value),t.xp6(1),t.hij(" ",e.name," ")}}function x(o,i){if(1&o){const e=t.EpF();t.TgZ(0,"li",20),t.NdJ("click",function(){const s=t.CHM(e).$implicit,O=t.oxw(2);return t.KtG(O.onTypeSelected(s.id))}),t._uU(1),t.qZA()}if(2&o){const e=i.$implicit,r=t.oxw(2);t.ekj("active",e.id===r.params.itemClassId),t.Q6J("value",e.id),t.xp6(1),t.hij(" ",e.name,"")}}function _(o,i){if(1&o&&(t.TgZ(0,"div",21),t._UZ(1,"app-card",22),t.qZA()),2&o){const e=i.$implicit;t.xp6(1),t.Q6J("item",e)}}function C(o,i){if(1&o){const e=t.EpF();t.TgZ(0,"div",23)(1,"app-pager",24),t.NdJ("pageChanged",function(n){t.CHM(e);const s=t.oxw(2);return t.KtG(s.onPageChanged(n))}),t.qZA()()}if(2&o){const e=t.oxw(2);t.xp6(1),t.Q6J("totalCount",e.totalCount)("pageSize",e.params.pageSize)("pageNumber",e.params.pageNumber)}}function y(o,i){if(1&o){const e=t.EpF();t.TgZ(0,"div",2)(1,"div",3)(2,"h5",4),t._uU(3,"Sort"),t.qZA(),t.TgZ(4,"select",5),t.NdJ("change",function(n){t.CHM(e);const s=t.oxw();return t.KtG(s.onSortSelected(n))}),t.YNc(5,P,2,3,"option",6),t.qZA(),t.TgZ(6,"h5",4),t._uU(7,"Types"),t.qZA(),t.TgZ(8,"ul",7),t.YNc(9,x,2,4,"li",8),t.qZA()(),t.TgZ(10,"div",9)(11,"div",10)(12,"input",11,12),t.NdJ("keyup.enter",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.onSearch())}),t.qZA(),t.TgZ(14,"button",13),t.NdJ("click",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.onSearch())}),t._UZ(15,"i",14),t.qZA(),t.TgZ(16,"button",15),t.NdJ("click",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.onReset())}),t._uU(17,"Reset"),t.qZA()(),t.TgZ(18,"div",16),t.YNc(19,_,2,1,"div",17),t.qZA(),t.YNc(20,C,2,3,"div",18),t.qZA()()}if(2&o){const e=t.oxw();t.xp6(5),t.Q6J("ngForOf",e.sortOptions),t.xp6(4),t.Q6J("ngForOf",e.types),t.xp6(10),t.Q6J("ngForOf",e.products),t.xp6(1),t.Q6J("ngIf",e.totalCount>0)}}let T=(()=>{class o{constructor(e,r,n){this.productService=e,this.route=r,this.router=n,this.products=[],this.totalCount=0,this.types=[],this.sortOptions=[{name:"Alphabetical",value:"name"},{name:"Price: Low to high",value:"priceAsc"},{name:"Price: High to low",value:"priceDesc"}],this.productService.resetParams(),this.params=e.getParams(),this.params.itemClassId=this.route.snapshot.queryParams.category||0}ngOnInit(){this.loadProducts(),this.loadTypes()}loadTypes(){this.productService.getTypes().subscribe({next:e=>{this.types=e}})}loadProducts(){this.productService.getAll().subscribe({next:e=>{this.products=e.data,this.totalCount=e.count}})}onPageChanged(e){const r=this.productService.getParams();r.pageNumber!==e&&(r.pageNumber=e,this.productService.setParams(r),this.params=r,this.loadProducts())}onSortSelected(e){const r=this.productService.getParams();r.sort=e.target.value,this.productService.setParams(r),this.params=r,this.loadProducts()}onTypeSelected(e){const r=this.productService.getParams();r.itemClassId=e,r.pageNumber=1,this.productService.setParams(r),this.params=r,this.loadProducts()}onSearch(){const e=this.productService.getParams();e.search=this.searchTerm?.nativeElement.value,e.pageNumber=1,this.productService.setParams(e),this.params=e,this.loadProducts()}onReset(){this.searchTerm&&(this.searchTerm.nativeElement.value=""),this.params=new g.L,this.productService.setParams(this.params),this.loadProducts()}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(d.M),t.Y36(a.gz),t.Y36(a.F0))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-product"]],viewQuery:function(e,r){if(1&e&&t.Gf(f,5),2&e){let n;t.iGM(n=t.CRH())&&(r.searchTerm=n.first)}},decls:2,vars:1,consts:[[1,"container-fluid","container-xxl"],["class","row",4,"ngIf"],[1,"row"],[1,"col-12","col-sm-4","col-md-3","col-lg-2"],[1,"text-info","ms-3"],[1,"form-select","mb-4",3,"change"],[3,"selected","value",4,"ngFor","ngForOf"],[1,"list-group","my-3","rounded-3","shadow-sm"],["class","list-group-item pointer",3,"active","value","click",4,"ngFor","ngForOf"],[1,"col-12","col-sm-8","col-md-9","col-lg-10"],[1,"d-flex","mt-2","mb-3"],["type","text","placeholder","Search",1,"form-control","me-2","bg-transparent",3,"keyup.enter"],["search",""],[1,"btn","btn-outline-info","mx-2",3,"click"],[1,"bi","bi-search"],[1,"btn","btn-outline-success",3,"click"],[1,"row","d-flex","align-items-stretch"],["class","col-6 col-md-4 col-lg-3",4,"ngFor","ngForOf"],["class","d-flex justify-content-center",4,"ngIf"],[3,"selected","value"],[1,"list-group-item","pointer",3,"value","click"],[1,"col-6","col-md-4","col-lg-3"],[3,"item"],[1,"d-flex","justify-content-center"],[3,"totalCount","pageSize","pageNumber","pageChanged"]],template:function(e,r){1&e&&(t.TgZ(0,"div",0),t.YNc(1,y,21,4,"div",1),t.qZA()),2&e&&(t.xp6(1),t.Q6J("ngIf",r.types))},dependencies:[l.sg,l.O5,p.YN,p.Kr,h.P,v.A]}),o})();var m=c(9105),Z=c(8909),S=c(1584),b=c(3968);function w(o,i){if(1&o&&(t.TgZ(0,"div",7),t._UZ(1,"ngx-gallery",8),t.qZA()),2&o){const e=t.oxw(2);t.xp6(1),t.Q6J("options",e.galleryOptions)("images",e.galleryImages)}}function A(o,i){if(1&o&&(t.TgZ(0,"div",1)(1,"div",2)(2,"div",3),t.YNc(3,w,2,2,"div",4),t.qZA(),t.TgZ(4,"div",5),t._UZ(5,"app-detail",6),t.qZA()()()),2&o){const e=t.oxw();t.xp6(3),t.Q6J("ngIf",e.showGallery()),t.xp6(2),t.Q6J("item",e.product)}}const N=[{path:"",component:T},{path:":id",component:(()=>{class o{constructor(e,r,n,s){this.route=e,this.productService=r,this.bcService=n,this.userService=s,this.galleryOptions=[],this.galleryImages=[],this.id=Number(this.route.snapshot.paramMap.get("id")),this.galleryOptions=[{imagePercent:100,thumbnailsColumns:4,imageAnimation:m.zw.Slide,preview:!0,imageSwipe:!0,thumbnailsSwipe:!0,previewCloseOnClick:!0,previewCloseOnEsc:!0,thumbnailMargin:0,thumbnailsMargin:0,previewKeyboardNavigation:!0,imageAutoPlay:!0,imageAutoPlayInterval:5e3}]}ngOnInit(){this.loadProduct()}loadProduct(){this.productService.getProduct(this.id).subscribe({next:e=>{this.product=e,this.bcService.set("@productDetails",e.name),this.galleryImages=this.defineGalleryImages()}})}defineGalleryImages(){if(!this.product)return[];if(0===this.product.productPhotos.length)return[];const e=[],r=[];this.product.productPhotos.forEach(n=>{r.push(n.photo)});for(const n of r)e.push({small:n.url,medium:n.url,big:n.url});return e}showGallery(){return this.galleryImages.length>0}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(a.gz),t.Y36(d.M),t.Y36(Z.pm),t.Y36(S.K))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-product-detail"]],decls:1,vars:1,consts:[["class","container-fluid container-xxl",4,"ngIf"],[1,"container-fluid","container-xxl"],[1,"row"],[1,"col-12","col-sm-6","col-lg-5","mb-3"],["class","gallery-viewer",4,"ngIf"],[1,"col-12","col-sm-6","col-lg-7","mb-3"],[3,"item"],[1,"gallery-viewer"],[1,"ngx-gallery","rounded-4","shadow-info","overflow-hidden",3,"options","images"]],template:function(e,r){1&e&&t.YNc(0,A,6,2,"div",0),2&e&&t.Q6J("ngIf",r.product)},dependencies:[l.O5,m.g$,b.J],styles:[".card[_ngcontent-%COMP%]{background-color:#0ff}.card[_ngcontent-%COMP%]   .text-center[_ngcontent-%COMP%]{padding-bottom:20px}"]}),o})(),data:{breadcrumb:{alias:"productDetails"}}}];let J=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[a.Bz.forChild(N),a.Bz]}),o})();var M=c(4466);let I=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[l.ez,J,M.m]}),o})()}}]);