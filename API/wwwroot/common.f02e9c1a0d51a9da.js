"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[592],{7573:(x,f,r)=>{r.d(f,{e:()=>p});var e=r(529),s=r(9646),m=r(4004),v=r(6590),g=r(2340),b=r(1571);let p=(()=>{class c{constructor(t){this.http=t,this.baseUrl=g.N.apiUrl,this.params=new v.R,this.areas=[],this.jobs=[],this.jobCache=new Map}getAll(t=!0){if(t||(this.jobCache=new Map),this.jobCache.size>0&&t&&this.jobCache.has(Object.values(this.params).join("-"))&&(this.pagination=this.jobCache.get(Object.values(this.params).join("-")),this.pagination))return(0,s.of)(this.pagination);let a=new e.LE;return this.params.areaId>0&&(a=a.append("areaId",this.params.areaId)),this.params.userId>0&&(a=a.append("userId",this.params.userId)),a=a.append("sort",this.params.sort),a=a.append("pageIndex",this.params.pageNumber),a=a.append("pageSize",this.params.pageSize),this.params.search&&(a=a.append("search",this.params.search)),this.http.get(this.baseUrl+"jobs",{params:a}).pipe((0,m.U)(u=>(this.jobCache.set(Object.values(this.params).join("-"),u),this.pagination=u,u)))}getById(t){const a=[...this.jobCache.values()].reduce((u,i)=>({...u,...i.data.find(d=>d.id===t)}),{});return 0!==Object.keys(a).length?(0,s.of)(a):this.http.get(this.baseUrl+"jobs/"+t)}add(t){return this.http.post(this.baseUrl+"jobs",t)}delete(t){return this.http.delete(this.baseUrl+"jobs/"+t)}edit(t){return this.http.put(this.baseUrl+"jobs",t)}getInterestedJobsList(){return this.http.get(this.baseUrl+"jobs/follow")}follow(t){return this.http.post(this.baseUrl+`jobs/follow/${t}`,{})}unfollow(t){return this.http.post(this.baseUrl+`jobs/unfollow/${t}`,{})}getAreas(){return this.areas.length>0?(0,s.of)(this.areas):this.http.get(this.baseUrl+"jobs/areas").pipe((0,m.U)(t=>(this.areas=t,t)))}deletePhoto(t,a){let u=new e.LE;return u=u.append("photoId",t),u=u.append("serviceId",a),this.http.delete(this.baseUrl+"jobs/photo/delete",{params:u})}setParams(t){this.params=t}getParams(){return this.params}resetParams(){this.params=new v.R}}return c.\u0275fac=function(t){return new(t||c)(b.LFG(e.eN))},c.\u0275prov=b.Yz7({token:c,factory:c.\u0275fac,providedIn:"root"}),c})()},5528:(x,f,r)=>{r.d(f,{M:()=>p});var e=r(529),s=r(2340),m=r(9646),v=r(4004),g=r(4020),b=r(1571);let p=(()=>{class c{constructor(t){this.http=t,this.baseUrl=s.N.apiUrl,this.params=new g.L,this.types=[],this.products=[],this.productCache=new Map}getAll(t=!0){if(t||(this.productCache=new Map),this.productCache.size>0&&t&&this.productCache.has(Object.values(this.params).join("-"))&&(this.pagination=this.productCache.get(Object.values(this.params).join("-")),this.pagination))return(0,m.of)(this.pagination);let a=new e.LE;return this.params.itemClassId>0&&(a=a.append("itemClassId",this.params.itemClassId)),this.params.userId>0&&(a=a.append("userId",this.params.userId)),a=a.append("sort",this.params.sort),a=a.append("pageIndex",this.params.pageNumber),a=a.append("pageSize",this.params.pageSize),this.params.search&&(a=a.append("search",this.params.search)),this.http.get(this.baseUrl+"products",{params:a}).pipe((0,v.U)(u=>(this.productCache.set(Object.values(this.params).join("-"),u),this.pagination=u,u)))}getProduct(t){const a=[...this.productCache.values()].reduce((u,i)=>({...u,...i.data.find(d=>d.id===t)}),{});return 0!==Object.keys(a).length?(0,m.of)(a):this.http.get(this.baseUrl+"products/"+t)}setParams(t){this.params=t}getParams(){return this.params}getTypes(){return this.types.length>0?(0,m.of)(this.types):this.http.get(this.baseUrl+"products/types").pipe((0,v.U)(t=>this.types=t))}add(t){return this.http.post(this.baseUrl+"products",t)}delete(t){return this.http.delete(this.baseUrl+"products/"+t)}edit(t){return this.http.put(this.baseUrl+"products",t)}resetParams(){this.params=new g.L}deletePhoto(t,a){let u=new e.LE;return u=u.append("photoId",t),u=u.append("productId",a),this.http.delete(this.baseUrl+"products/photo/delete",{params:u})}}return c.\u0275fac=function(t){return new(t||c)(b.LFG(e.eN))},c.\u0275prov=b.Yz7({token:c,factory:c.\u0275fac,providedIn:"root"}),c})()},6325:(x,f,r)=>{r.d(f,{r:()=>p});var e=r(3795),s=r(529),m=r(2340),v=r(9646),g=r(4004),b=r(1571);let p=(()=>{class c{constructor(t){this.http=t,this.baseUrl=m.N.apiUrl,this.params=new e.M,this.categories=[],this.services=[],this.serviceCache=new Map}getAll(t=!0){if(t||(this.serviceCache=new Map),this.serviceCache.size>0&&t&&this.serviceCache.has(Object.values(this.params).join("-"))&&(this.pagination=this.serviceCache.get(Object.values(this.params).join("-")),this.pagination))return(0,v.of)(this.pagination);let a=new s.LE;return this.params.categoryId>0&&(a=a.append("categoryId",this.params.categoryId)),this.params.userId>0&&(a=a.append("userId",this.params.userId)),a=a.append("sort",this.params.sort),a=a.append("pageIndex",this.params.pageNumber),a=a.append("pageSize",this.params.pageSize),this.params.search&&(a=a.append("search",this.params.search)),this.http.get(this.baseUrl+"services",{params:a}).pipe((0,g.U)(u=>(this.serviceCache.set(Object.values(this.params).join("-"),u),this.pagination=u,u)))}getById(t){const a=[...this.serviceCache.values()].reduce((u,i)=>({...u,...i.data.find(d=>d.id===t)}),{});return 0!==Object.keys(a).length?(0,v.of)(a):this.http.get(this.baseUrl+"services/"+t)}add(t){return this.http.post(this.baseUrl+"services",t)}delete(t){return this.http.delete(this.baseUrl+"services/"+t)}edit(t){return this.http.put(this.baseUrl+"services",t)}getCategories(){return this.categories.length>0?(0,v.of)(this.categories):this.http.get(this.baseUrl+"services/categories").pipe((0,g.U)(t=>(this.categories=t,t)))}deletePhoto(t,a){let u=new s.LE;return u=u.append("photoId",t),u=u.append("serviceId",a),this.http.delete(this.baseUrl+"services/photo/delete",{params:u})}setParams(t){this.params=t}getParams(){return this.params}resetParams(){this.params=new e.M}}return c.\u0275fac=function(t){return new(t||c)(b.LFG(s.eN))},c.\u0275prov=b.Yz7({token:c,factory:c.\u0275fac,providedIn:"root"}),c})()},9219:(x,f,r)=>{r.d(f,{A:()=>u});var e=r(9105),s=r(1571),m=r(6895),v=r(2559);function g(i,d){1&i&&s._UZ(0,"img",9)}function b(i,d){if(1&i&&s._UZ(0,"ngx-gallery",10),2&i){const l=s.oxw();s.Q6J("options",l.galleryOptions)("images",l.galleryImages)}}function p(i,d){if(1&i&&(s.TgZ(0,"p",11),s._uU(1),s.ALo(2,"slice"),s.qZA()),2&i){const l=s.oxw();s.xp6(1),s.hij("",s.Dn7(2,1,l.item.description,0,70)," ...")}}function c(i,d){if(1&i&&(s.TgZ(0,"p",11),s._uU(1),s.qZA()),2&i){const l=s.oxw();s.xp6(1),s.Oqu(l.item.description)}}const _=function(i,d){return{"bg-info":i,"bg-primary":d}};function t(i,d){if(1&i&&(s.TgZ(0,"div",12)(1,"a",13),s._uU(2,"View item"),s.qZA()()),2&i){const l=s.oxw();s.s9C("routerLink",l.url),s.Q6J("ngClass",s.WLB(3,_,"product"===l.type||"job"===l.type,"service"===l.type)),s.xp6(1),s.s9C("routerLink",l.url)}}const a=function(i,d){return{"border-info":i,"border-primary":d}};let u=(()=>{class i{constructor(){this.galleryOptions=[],this.galleryImages=[],this.photos=[],this.type="product",this.showSellerName=!0,this.url="",this.galleryOptions=[{imagePercent:100,thumbnailsColumns:4,imageAnimation:e.zw.Slide,preview:!1,imageSwipe:!0,thumbnailsSwipe:!0,previewCloseOnClick:!0,previewCloseOnEsc:!0,thumbnailMargin:0,thumbnailsMargin:0,previewKeyboardNavigation:!0,thumbnails:!1,imageAutoPlay:!0,imageAutoPlayInterval:Math.floor(5001*Math.random()+5e3),imageArrows:!1}]}ngOnInit(){switch(this.galleryImages=this.defineGalleryImages(this.type),this.type){case"product":this.url=`/products/${this.item.id}`;break;case"service":this.url=`/services/${this.item.id}`;break;case"job":this.url=`/jobs/${this.item.id}`}}defineGalleryImages(l){if("product"===l&&0===this.item.productPhotos.length)return[];if("service"===l&&0===this.item.servicePhotos.length)return[];if("job"===l)return[];const n=[],h=[];"service"===l&&this.item.servicePhotos.forEach(o=>{h.push(o.photo)}),"product"===l&&this.item.productPhotos.forEach(o=>{h.push(o.photo)});for(const o of h)n.push({small:o.url,medium:o.url,big:o.url});return n}}return i.\u0275fac=function(l){return new(l||i)},i.\u0275cmp=s.Xpm({type:i,selectors:[["app-card"]],inputs:{item:"item",type:"type",showSellerName:"showSellerName"},decls:13,vars:13,consts:[[1,"card","mb-4","overflow-hidden","border","border-4","rounded-4",3,"ngClass"],["src","../../../../assets/placeholder-image.png",4,"ngIf"],["class","gallery-card-img",3,"options","images",4,"ngIf"],[1,"card-body"],[1,"card-title"],["class","card-text",4,"ngIf"],[1,"list-group","list-group-flush"],[1,"list-group-item","text-success","fw-bold","fs-5","text-center"],["class","card-footer text-center pointer",3,"routerLink","ngClass",4,"ngIf"],["src","../../../../assets/placeholder-image.png"],[1,"gallery-card-img",3,"options","images"],[1,"card-text"],[1,"card-footer","text-center","pointer",3,"routerLink","ngClass"],[1,"card-link","text-decoration-none","text-white","fw-bold",3,"routerLink"]],template:function(l,n){1&l&&(s.TgZ(0,"div",0),s.YNc(1,g,1,0,"img",1),s.YNc(2,b,1,2,"ngx-gallery",2),s.TgZ(3,"div",3)(4,"h5",4),s._uU(5),s.qZA(),s.YNc(6,p,3,5,"p",5),s.YNc(7,c,2,1,"p",5),s.qZA(),s.TgZ(8,"ul",6)(9,"li",7),s._uU(10),s.ALo(11,"currency"),s.qZA()(),s.YNc(12,t,3,6,"div",8),s.qZA()),2&l&&(s.Q6J("ngClass",s.WLB(10,a,"product"===n.type||"job"===n.type,"service"===n.type)),s.xp6(1),s.Q6J("ngIf",0===n.galleryImages.length&&"job"!==n.type),s.xp6(1),s.Q6J("ngIf",n.galleryImages.length>0&&"job"!==n.type),s.xp6(3),s.Oqu(n.item.name),s.xp6(1),s.Q6J("ngIf",n.item.description.length>70),s.xp6(1),s.Q6J("ngIf",n.item.description.length<=70),s.xp6(3),s.Oqu(s.lcZ(11,8,n.item.price)),s.xp6(2),s.Q6J("ngIf","job"!==n.type))},dependencies:[m.mk,m.O5,v.rH,e.g$,m.OU,m.H9],styles:[".card-body[_ngcontent-%COMP%]{height:150px}"]}),i})()},4897:(x,f,r)=>{r.d(f,{L:()=>b});var e=r(1571),s=r(433),m=r(6895),v=r(983);function g(p,c){if(1&p&&(e.TgZ(0,"div",4),e._uU(1),e.ALo(2,"lowercase"),e.qZA()),2&p){const _=e.oxw();e.xp6(1),e.hij(" Enter your ",e.lcZ(2,1,_.label)," ")}}let b=(()=>{class p{constructor(_){this.ngControl=_,this.label="",this.ngControl.valueAccessor=this,this.bsConfig={containerClass:"theme-default",dateInputFormat:"YYYY MM DD"}}writeValue(_){}registerOnChange(_){}registerOnTouched(_){}get control(){return this.ngControl.control}}return p.\u0275fac=function(_){return new(_||p)(e.Y36(s.a5,2))},p.\u0275cmp=e.Xpm({type:p,selectors:[["app-date-picker"]],inputs:{label:"label",maxDate:"maxDate"},decls:6,vars:9,consts:[[1,"form-floating","mb-3"],["bsDatepicker","","type","text",1,"form-control",3,"formControl","placeholder","ngClass","bsConfig","maxDate"],["for","floatingInput"],["class","invalid-feedback",4,"ngIf"],[1,"invalid-feedback"]],template:function(_,t){1&_&&(e.TgZ(0,"div",0),e._UZ(1,"input",1),e.ALo(2,"lowercase"),e.TgZ(3,"label",2),e._uU(4),e.qZA(),e.YNc(5,g,3,3,"div",3),e.qZA()),2&_&&(e.xp6(1),e.s9C("placeholder",e.lcZ(2,7,t.label)),e.Q6J("formControl",t.control)("ngClass",t.control.touched?t.control.invalid?"is-invalid":"is-valid":null)("bsConfig",t.bsConfig)("maxDate",t.maxDate),e.xp6(3),e.Oqu(t.label),e.xp6(1),e.Q6J("ngIf",null==t.control.errors?null:t.control.errors.required))},dependencies:[m.mk,m.O5,s.Fj,s.JJ,s.oH,v.Np,v.Y5,m.i8]}),p})()},3968:(x,f,r)=>{r.d(f,{J:()=>l});var e=r(1571),s=r(6895),m=r(2559);function v(n,h){if(1&n&&(e.ynx(0),e.TgZ(1,"p",9),e._uU(2," Visit "),e.TgZ(3,"a",10),e._uU(4),e.qZA()(),e.BQk()),2&n){const o=e.oxw(2);e.xp6(3),e.s9C("routerLink",o.url),e.xp6(1),e.hij(" ",o.vendor," ")}}function g(n,h){if(1&n&&(e.TgZ(0,"p",12),e._uU(1),e.qZA()),2&n){const o=e.oxw(3);e.xp6(1),e.hij(" ",o.item.stockQuantity," Available ")}}function b(n,h){1&n&&(e.TgZ(0,"p",12),e._uU(1," Not Available "),e.qZA())}function p(n,h){if(1&n&&(e.ynx(0),e.YNc(1,g,2,1,"p",11),e.YNc(2,b,2,0,"p",11),e.BQk()),2&n){const o=e.oxw(2);e.xp6(1),e.Q6J("ngIf",o.item.stockQuantity>0),e.xp6(1),e.Q6J("ngIf",o.item.stockQuantity<=0)}}function c(n,h){if(1&n&&(e.TgZ(0,"h4",13),e._uU(1),e.ALo(2,"currency"),e.qZA()),2&n){const o=e.oxw(2);e.xp6(1),e.hij(" ",e.lcZ(2,1,o.item.price)," ")}}function _(n,h){if(1&n&&(e.TgZ(0,"h4",13),e._uU(1),e.ALo(2,"currency"),e.qZA()),2&n){const o=e.oxw(2);e.xp6(1),e.hij(" ",e.lcZ(2,1,o.item.salary)," ")}}function t(n,h){1&n&&e._UZ(0,"hr",14)}function a(n,h){if(1&n&&(e.TgZ(0,"div",15)(1,"div",16),e._UZ(2,"img",17),e.qZA(),e.TgZ(3,"div",18)(4,"p",19),e._uU(5," Job offer area "),e.qZA(),e.TgZ(6,"h4",20),e._uU(7),e.qZA()()()),2&n){const o=e.oxw(2);e.xp6(2),e.s9C("src",o.item.jobArea.area.areaPhoto.photo.url,e.LSH),e.xp6(5),e.hij(" ",o.item.jobArea.area.name," ")}}const u=function(n,h){return{"shadow-info":n,"shadow-warning":h}},i=function(n,h){return{"border-info":n,"border-primary":h}};function d(n,h){if(1&n&&(e.TgZ(0,"div",1)(1,"h3",2),e._uU(2),e.qZA(),e.TgZ(3,"div",3),e.YNc(4,v,5,2,"ng-container",4),e.YNc(5,p,3,2,"ng-container",4),e.qZA(),e.YNc(6,c,3,3,"h4",5),e.YNc(7,_,3,3,"h4",5),e._UZ(8,"hr",6),e.TgZ(9,"p"),e._uU(10),e.qZA(),e.YNc(11,t,1,0,"hr",7),e.YNc(12,a,8,2,"div",8),e.qZA()),2&n){const o=e.oxw();e.Q6J("ngClass",e.WLB(10,u,"product"===o.type||"job"===o.type,"service"===o.type)),e.xp6(2),e.hij(" ",o.item.name," "),e.xp6(2),e.Q6J("ngIf",!o.fromAccount),e.xp6(1),e.Q6J("ngIf","product"===o.type),e.xp6(1),e.Q6J("ngIf","job"!==o.type),e.xp6(1),e.Q6J("ngIf","job"===o.type),e.xp6(1),e.Q6J("ngClass",e.WLB(13,i,"product"===o.type||"job"===o.type,"service"===o.type)),e.xp6(2),e.hij(" ",o.item.description," "),e.xp6(1),e.Q6J("ngIf","job"===o.type),e.xp6(1),e.Q6J("ngIf","job"===o.type)}}let l=(()=>{class n{constructor(){this.type="product",this.fromAccount=!1,this.url="",this.vendor=""}ngOnInit(){switch(this.type){case"product":this.url=`/user/${this.item.userProduct.userId}`,this.vendor=`${this.item.userProduct.user.firstName} ${this.item.userProduct.user.lastName}`;break;case"service":this.url=`/user/${this.item.userService.userId}`,this.vendor=`${this.item.userService.user.firstName} ${this.item.userService.user.lastName}`}}}return n.\u0275fac=function(o){return new(o||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-detail"]],inputs:{item:"item",type:"type",fromAccount:"fromAccount"},decls:1,vars:1,consts:[["class","p-4 rounded-4 bg-body-tertiary",3,"ngClass",4,"ngIf"],[1,"p-4","rounded-4","bg-body-tertiary",3,"ngClass"],[1,"fw-bold"],[1,"d-flex","justify-content-between"],[4,"ngIf"],["class","text-success text-center fw-bold",4,"ngIf"],[1,"my-4","text-info","border","border-2",3,"ngClass"],["class","my-4 text-info border border-2 border-info",4,"ngIf"],["class","row",4,"ngIf"],[1,"text-info"],[1,"text-info",3,"routerLink"],["class","text-muted",4,"ngIf"],[1,"text-muted"],[1,"text-success","text-center","fw-bold"],[1,"my-4","text-info","border","border-2","border-info"],[1,"row"],[1,"col-4"],[1,"img-fluid","rounded","shadow-sm",3,"src"],[1,"col-8"],[1,"text-muted","fst-italic"],[1,"text-info","fst-italic"]],template:function(o,C){1&o&&e.YNc(0,d,13,16,"div",0),2&o&&e.Q6J("ngIf",C.item)},dependencies:[s.mk,s.O5,m.rH,s.H9]}),n})()},6304:(x,f,r)=>{r.d(f,{t:()=>u});var e=r(1571),s=r(7573),m=r(7185),v=r(6895),g=r(2559);function b(i,d){if(1&i&&(e.TgZ(0,"p"),e._uU(1),e.qZA()),2&i){const l=d.ngIf;e.xp6(1),e.xDo(" ",l.street," ",l.number,", ",l.zipcode,", ",l.city,", ",l.state," ")}}function p(i,d){if(1&i&&(e.TgZ(0,"div",10)(1,"a",11),e._UZ(2,"img",12),e.qZA(),e.TgZ(3,"a",11),e._UZ(4,"img",13),e.qZA(),e.TgZ(5,"a",11),e._UZ(6,"img",14),e.qZA(),e.TgZ(7,"a",15),e._UZ(8,"img",16),e.qZA()()),2&i){const l=d.ngIf;e.xp6(1),e.MGl("href","https://facebook.com/",l.facebook,"",e.LSH),e.xp6(2),e.MGl("href","https://instagram.com/",l.instagram,"",e.LSH),e.xp6(2),e.MGl("href","https://wa.me/",l.phoneNumber,"",e.LSH)}}function c(i,d){if(1&i){const l=e.EpF();e.TgZ(0,"button",19),e.NdJ("click",function(){e.CHM(l);const h=e.oxw(2);return e.KtG(h.clickFollow())}),e._uU(1," I'm interested "),e.qZA()}}function _(i,d){if(1&i){const l=e.EpF();e.TgZ(0,"button",20),e.NdJ("click",function(){e.CHM(l);const h=e.oxw(2);return e.KtG(h.clickUnfollow())}),e._uU(1," Unfollow "),e.qZA()}}function t(i,d){if(1&i&&(e.ynx(0),e.YNc(1,c,2,0,"button",17),e.YNc(2,_,2,0,"button",18),e.BQk()),2&i){const l=e.oxw();e.xp6(1),e.Q6J("ngIf",!l.isFollowed()),e.xp6(1),e.Q6J("ngIf",l.isFollowed())}}function a(i,d){1&i&&(e.ynx(0),e.TgZ(1,"button",21),e._uU(2," I'm interested "),e.qZA(),e.BQk())}let u=(()=>{class i{constructor(l,n){this.jobService=l,this.toastr=n,this.myJobs=[],this.job={},this.loggedIn=!1}clickFollow(){this.jobService.follow(this.job.id).subscribe({next:()=>{this.toastr.success("Job followed successfully"),this.myJobs.push({job:this.job,jobId:this.job.id,userId:0})}})}clickUnfollow(){this.jobService.unfollow(this.job.id).subscribe({next:()=>{this.toastr.success("Job removed from your interests"),this.myJobs=this.myJobs.filter(l=>l.jobId!==this.job.id)}})}isFollowed(){let l=!1;return this.myJobs.forEach(n=>{n.jobId===this.job.id&&(l=!0)}),l}}return i.\u0275fac=function(l){return new(l||i)(e.Y36(s.e),e.Y36(m._W))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-job-info"]],inputs:{myJobs:"myJobs",job:"job",loggedIn:"loggedIn"},decls:24,vars:8,consts:[[1,"p-2","p-sm-4","border","border-4","border-info","border-opacity-50","rounded-4","shadow-sm"],[1,"d-none","d-sm-block","row","my-5"],[1,"col-5"],[1,"img-fluid","rounded",3,"src"],[1,"col-7","my-auto"],[1,"text-muted","fst-italic","mb-1"],[1,"border","border-1","border-opacity-100"],[4,"ngIf"],["class","d-flex justify-content-between",4,"ngIf"],[1,"my-2"],[1,"d-flex","justify-content-between"],["target","_blank",3,"href"],["src","../../../assets/social-media-icons/facebook.svg",1,"social-media-icons"],["src","../../../assets/social-media-icons/instagram.svg",1,"social-media-icons"],["src","../../../assets/social-media-icons/whatsapp.svg",1,"social-media-icons"],["href","","routerLink","/","target","_blank"],["src","../../../assets/social-media-icons/mail.svg",1,"social-media-icons"],["class","btn btn-outline-success btn-lg d-flex mx-auto",3,"click",4,"ngIf"],["class","btn btn-outline-warning btn-lg d-flex mx-auto",3,"click",4,"ngIf"],[1,"btn","btn-outline-success","btn-lg","d-flex","mx-auto",3,"click"],[1,"btn","btn-outline-warning","btn-lg","d-flex","mx-auto",3,"click"],["routerLink","/sign-in",1,"btn","btn-outline-success","btn-lg","d-flex","mx-auto"]],template:function(l,n){1&l&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2),e._UZ(3,"img",3),e.qZA(),e.TgZ(4,"div",4)(5,"p",5),e._uU(6," Job area: "),e.qZA(),e.TgZ(7,"h5"),e._uU(8),e.qZA()()(),e.TgZ(9,"h5"),e._uU(10),e.qZA(),e._UZ(11,"hr",6),e.TgZ(12,"h6"),e._uU(13,"Description"),e.qZA(),e.TgZ(14,"p"),e._uU(15),e.qZA(),e._UZ(16,"hr",6),e.TgZ(17,"h6"),e._uU(18,"Location"),e.qZA(),e.YNc(19,b,2,5,"p",7),e.YNc(20,p,9,3,"div",8),e.TgZ(21,"div",9),e.YNc(22,t,3,2,"ng-container",7),e.YNc(23,a,3,0,"ng-container",7),e.qZA()()),2&l&&(e.xp6(3),e.s9C("src",n.job.userJob.user.appUserPhoto.photo.url,e.LSH),e.xp6(5),e.hij(" ",n.job.jobArea.area.name," "),e.xp6(2),e.hij(" ",n.job.name," "),e.xp6(5),e.hij(" ",n.job.description," "),e.xp6(4),e.Q6J("ngIf",n.job.userJob.user.appUserAddress.address),e.xp6(1),e.Q6J("ngIf",n.job.userJob.user),e.xp6(2),e.Q6J("ngIf",n.loggedIn),e.xp6(1),e.Q6J("ngIf",!n.loggedIn))},dependencies:[v.O5,g.rH],styles:[".social-media-icons[_ngcontent-%COMP%]{max-height:50px}"]}),i})()},4217:(x,f,r)=>{r.d(f,{U:()=>p});var e=r(1571),s=r(433),m=r(6895);function v(c,_){if(1&c&&(e.TgZ(0,"div",4),e._uU(1),e.ALo(2,"lowercase"),e.qZA()),2&c){const t=e.oxw();e.xp6(1),e.hij("Please enter a ",e.lcZ(2,1,t.label),"")}}function g(c,_){if(1&c&&(e.TgZ(0,"div",4),e._uU(1),e.ALo(2,"titlecase"),e.qZA()),2&c){const t=e.oxw();e.xp6(1),e.AsE("",e.lcZ(2,2,t.label)," must be at least ",null==t.control.errors?null:t.control.errors.minlength.requiredLength," characters long")}}function b(c,_){if(1&c&&(e.TgZ(0,"div",4),e._uU(1),e.ALo(2,"titlecase"),e.qZA()),2&c){const t=e.oxw();e.xp6(1),e.AsE("",e.lcZ(2,2,t.label)," must be at most ",null==t.control.errors?null:t.control.errors.maxlength.requiredLength," characters long")}}let p=(()=>{class c{constructor(t){this.controlDir=t,this.label="",this.controlDir.valueAccessor=this}writeValue(t){}registerOnChange(t){}registerOnTouched(t){}get control(){return this.controlDir.control}}return c.\u0275fac=function(t){return new(t||c)(e.Y36(s.a5,2))},c.\u0275cmp=e.Xpm({type:c,selectors:[["app-text-area"]],inputs:{label:"label"},decls:7,vars:7,consts:[[1,"form-floating","mb-3"],[1,"form-control",2,"height","150px",3,"formControl","placeholder","ngClass"],["for","floatingInput"],["class","invalid-feedback",4,"ngIf"],[1,"invalid-feedback"]],template:function(t,a){1&t&&(e.TgZ(0,"div",0),e._UZ(1,"textarea",1),e.TgZ(2,"label",2),e._uU(3),e.qZA(),e.YNc(4,v,3,3,"div",3),e.YNc(5,g,3,4,"div",3),e.YNc(6,b,3,4,"div",3),e.qZA()),2&t&&(e.xp6(1),e.s9C("placeholder",a.label),e.Q6J("formControl",a.control)("ngClass",a.control.touched?a.control.invalid?"is-invalid":"is-valid":null),e.xp6(2),e.Oqu(a.label),e.xp6(1),e.Q6J("ngIf",null==a.control.errors?null:a.control.errors.required),e.xp6(1),e.Q6J("ngIf",null==a.control.errors?null:a.control.errors.minlength),e.xp6(1),e.Q6J("ngIf",null==a.control.errors?null:a.control.errors.maxlength))},dependencies:[m.mk,m.O5,s.Fj,s.JJ,s.oH,m.i8,m.rS]}),c})()},4015:(x,f,r)=>{r.d(f,{t:()=>u});var e=r(1571),s=r(433),m=r(6895);function v(i,d){1&i&&e._UZ(0,"div",5)}function g(i,d){if(1&i&&(e.TgZ(0,"div",6),e._uU(1),e.ALo(2,"lowercase"),e.qZA()),2&i){const l=e.oxw();e.xp6(1),e.hij("Please enter a ",e.lcZ(2,1,l.label),"")}}function b(i,d){1&i&&(e.TgZ(0,"div",6),e._uU(1," Invalid email address "),e.qZA())}function p(i,d){1&i&&(e.TgZ(0,"div",6),e._uU(1,"Password is not complex enouph"),e.qZA())}function c(i,d){1&i&&(e.TgZ(0,"div",6),e._uU(1,"This email address is already linked to an account"),e.qZA())}function _(i,d){1&i&&(e.TgZ(0,"div",6),e._uU(1,"Passwords do not match"),e.qZA())}function t(i,d){if(1&i&&(e.TgZ(0,"div",6),e._uU(1),e.ALo(2,"titlecase"),e.qZA()),2&i){const l=e.oxw();e.xp6(1),e.AsE("",e.lcZ(2,2,l.label)," must be at least ",null==l.control.errors?null:l.control.errors.minlength.requiredLength," characters long")}}function a(i,d){if(1&i&&(e.TgZ(0,"div",6),e._uU(1),e.ALo(2,"titlecase"),e.qZA()),2&i){const l=e.oxw();e.xp6(1),e.AsE("",e.lcZ(2,2,l.label)," must be at most ",null==l.control.errors?null:l.control.errors.maxlength.requiredLength," characters long")}}let u=(()=>{class i{constructor(l){this.controlDir=l,this.type="text",this.label="",this.controlDir.valueAccessor=this}writeValue(l){}registerOnChange(l){}registerOnTouched(l){}get control(){return this.controlDir.control}}return i.\u0275fac=function(l){return new(l||i)(e.Y36(s.a5,2))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-text-input"]],inputs:{type:"type",label:"label"},decls:12,vars:13,consts:[[1,"form-floating","mb-3"],["autofocus","",1,"form-control",3,"type","formControl","placeholder","ngClass"],["class","fa fa-spinner fa-spin loader",4,"ngIf"],["for","floatingInput"],["class","invalid-feedback",4,"ngIf"],[1,"fa","fa-spinner","fa-spin","loader"],[1,"invalid-feedback"]],template:function(l,n){1&l&&(e.TgZ(0,"div",0),e._UZ(1,"input",1),e.YNc(2,v,1,0,"div",2),e.TgZ(3,"label",3),e._uU(4),e.qZA(),e.YNc(5,g,3,3,"div",4),e.YNc(6,b,2,0,"div",4),e.YNc(7,p,2,0,"div",4),e.YNc(8,c,2,0,"div",4),e.YNc(9,_,2,0,"div",4),e.YNc(10,t,3,4,"div",4),e.YNc(11,a,3,4,"div",4),e.qZA()),2&l&&(e.xp6(1),e.s9C("type",n.type),e.s9C("placeholder",n.label),e.Q6J("formControl",n.control)("ngClass",n.control.touched?n.control.invalid?"is-invalid":"is-valid":null),e.xp6(1),e.Q6J("ngIf","PENDING"===n.control.status),e.xp6(2),e.Oqu(n.label),e.xp6(1),e.Q6J("ngIf",null==n.control.errors?null:n.control.errors.required),e.xp6(1),e.Q6J("ngIf",null==n.control.errors?null:n.control.errors.email),e.xp6(1),e.Q6J("ngIf",null==n.control.errors?null:n.control.errors.pattern),e.xp6(1),e.Q6J("ngIf",null==n.control.errors?null:n.control.errors.emailExists),e.xp6(1),e.Q6J("ngIf",null==n.control.errors?null:n.control.errors.notMatching),e.xp6(1),e.Q6J("ngIf",null==n.control.errors?null:n.control.errors.minlength),e.xp6(1),e.Q6J("ngIf",null==n.control.errors?null:n.control.errors.maxlength))},dependencies:[m.mk,m.O5,s.Fj,s.JJ,s.oH,m.i8,m.rS],styles:[".loader[_ngcontent-%COMP%]{position:absolute;width:auto;top:20px;right:40px;margin-top:0}"]}),i})()},1106:(x,f,r)=>{r.d(f,{r:()=>l});var e=r(1571),s=r(7185),m=r(1584),v=r(3238),g=r(6895),b=r(2559);function p(n,h){if(1&n&&(e.TgZ(0,"div",16),e._UZ(1,"img",17),e.qZA()),2&n){const o=e.oxw(2);e.xp6(1),e.s9C("src",o.user.photoUrl||"/assets/placeholder-image.png",e.LSH)}}function c(n,h){if(1&n){const o=e.EpF();e.TgZ(0,"i",20),e.NdJ("click",function(){e.CHM(o);const I=e.oxw(3);return e.KtG(I.clickUnsave())}),e.qZA()}}function _(n,h){if(1&n){const o=e.EpF();e.TgZ(0,"i",21),e.NdJ("click",function(){e.CHM(o);const I=e.oxw(3);return e.KtG(I.clickSave())}),e.qZA()}}function t(n,h){if(1&n&&(e.ynx(0),e.YNc(1,c,1,0,"i",18),e.YNc(2,_,1,0,"i",19),e.BQk()),2&n){const o=e.oxw(2);e.xp6(1),e.Q6J("ngIf",!0===o.isSaved),e.xp6(1),e.Q6J("ngIf",!1===o.isSaved)}}function a(n,h){1&n&&(e.TgZ(0,"span"),e._UZ(1,"i",22),e.TgZ(2,"span",23),e._uU(3,"online"),e.qZA()())}function u(n,h){if(1&n&&(e.TgZ(0,"p",24),e._uU(1),e.qZA()),2&n){const o=e.oxw(2);e.xp6(1),e.xDo(" ",o.user.address.street," ",o.user.address.number,", ",o.user.address.zipcode,", ",o.user.address.city,", ",o.user.address.state," ")}}function i(n,h){if(1&n&&(e.TgZ(0,"a",25),e._UZ(1,"i",26),e.qZA()),2&n){const o=e.oxw(2);e.MGl("routerLink","/account/messages/",o.user.userName,"")}}function d(n,h){if(1&n&&(e.TgZ(0,"div",1)(1,"div",2),e.YNc(2,p,2,1,"div",3),e.TgZ(3,"div",4)(4,"div")(5,"div",5),e.YNc(6,t,3,2,"ng-container",6),e.TgZ(7,"span",7),e._uU(8),e.qZA(),e.YNc(9,a,4,0,"span",6),e.ALo(10,"async"),e.qZA(),e.TgZ(11,"p",8),e._uU(12),e.qZA(),e.YNc(13,u,2,5,"p",9),e.TgZ(14,"div",10)(15,"a",11),e._UZ(16,"img",12),e.qZA(),e.TgZ(17,"a",11),e._UZ(18,"img",13),e.qZA(),e.TgZ(19,"a",11),e._UZ(20,"img",14),e.qZA(),e.YNc(21,i,2,1,"a",15),e.qZA()()()()()),2&n){const o=e.oxw();let C;e.xp6(2),e.Q6J("ngIf",!o.compact),e.xp6(4),e.Q6J("ngIf",void 0!==o.isSaved&&!o.fromAccount),e.xp6(2),e.hij(" ",o.user.fullName," "),e.xp6(1),e.Q6J("ngIf",null==(C=e.lcZ(10,13,o.presenceService.onlineUsers$))?null:C.includes(o.user.userName)),e.xp6(3),e.hij(" ",o.user.age," years old "),e.xp6(1),e.Q6J("ngIf",o.user.address),e.xp6(2),e.MGl("href","https://instagram.com/",o.user.instagram,"",e.LSH),e.xp6(1),e.MGl("alt","",o.user.fullName," Instagram"),e.xp6(1),e.MGl("href","https://facebook.com/",o.user.facebook,"",e.LSH),e.xp6(1),e.MGl("alt","",o.user.fullName," Instagram"),e.xp6(1),e.MGl("href","https://wa.me/",o.user.phoneNumber,"",e.LSH),e.xp6(1),e.MGl("alt","",o.user.fullName," Instagram"),e.xp6(1),e.Q6J("ngIf",!o.fromAccount)}}let l=(()=>{class n{constructor(o,C,I){this.toastr=o,this.userService=C,this.presenceService=I,this.loggedIn=!1,this.fromAccount=!1,this.compact=!1}ngOnInit(){this.loggedIn&&this.loadIsSaved()}loadIsSaved(){this.user&&this.userService.isSaved(this.user.email).subscribe({next:C=>{this.isSaved=C}})}clickSave(){this.user&&this.userService.save(this.user.email).subscribe({next:()=>{this.toastr.success("User saved")},complete:()=>{this.loadIsSaved()}})}clickUnsave(){this.user&&this.userService.unsave(this.user.email).subscribe({next:()=>{this.toastr.success("User unsaved")},complete:()=>{this.loadIsSaved()}})}}return n.\u0275fac=function(o){return new(o||n)(e.Y36(s._W),e.Y36(m.K),e.Y36(v.Q))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-user-card"]],inputs:{loggedIn:"loggedIn",user:"user",fromAccount:"fromAccount",compact:"compact"},decls:1,vars:1,consts:[["class","bg-body-tertiary shadow-sm rounded-5 p-3 mb-4",4,"ngIf"],[1,"bg-body-tertiary","shadow-sm","rounded-5","p-3","mb-4"],[1,"row"],["class","col-3 col-sm-2 d-flex align-items-center",4,"ngIf"],[1,"col-9","col-sm-10","d-flex","align-items-center"],[1,"mb-3"],[4,"ngIf"],[1,"fs-3","fw-light","me-2"],[1,"text-info"],["class","fw-light text-muted fst-italic",4,"ngIf"],[1,"d-flex","icons","align-items-center"],["target","_blank",1,"me-2",3,"href"],["src","../../../assets/social-media-icons/instagram.svg",3,"alt"],["src","../../../assets/social-media-icons/facebook.svg",3,"alt"],["src","../../../assets/social-media-icons/whatsapp.svg",2,"color","#3ab54b",3,"alt"],["class","btn btn-info rounded-circle",3,"routerLink",4,"ngIf"],[1,"col-3","col-sm-2","d-flex","align-items-center"],[1,"img-fluid","rounded","shadow-sm",3,"src"],["class","fa fa-bookmark pointer text-warning fs-3 me-2",3,"click",4,"ngIf"],["class","fa fa-bookmark-o pointer text-warning fs-3 me-2",3,"click",4,"ngIf"],[1,"fa","fa-bookmark","pointer","text-warning","fs-3","me-2",3,"click"],[1,"fa","fa-bookmark-o","pointer","text-warning","fs-3","me-2",3,"click"],[1,"fa","fa-user","me-2","is-online"],[1,"fs-6","fw-light","text-muted","ms-2"],[1,"fw-light","text-muted","fst-italic"],[1,"btn","btn-info","rounded-circle",3,"routerLink"],[1,"bi","bi-chat","text-white"]],template:function(o,C){1&o&&e.YNc(0,d,22,15,"div",0),2&o&&e.Q6J("ngIf",void 0!==C.user)},dependencies:[g.O5,b.rH,g.Ov],styles:[".icons[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-height:45px}@keyframes _ngcontent-%COMP%_fa-blink{0%{opacity:1}to{opacity:.4}}.is-online[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_fa-blink 1.5s linear infinite;color:#01bd2a}"]}),n})()},6590:(x,f,r)=>{r.d(f,{R:()=>e});class e{constructor(){this.sort="name",this.pageNumber=1,this.pageSize=8,this.search="",this.areaId=0,this.userId=0}}},4020:(x,f,r)=>{r.d(f,{L:()=>e});class e{constructor(){this.sort="name",this.pageNumber=1,this.pageSize=8,this.search="",this.itemClassId=0,this.userId=0}}},3795:(x,f,r)=>{r.d(f,{M:()=>e});class e{constructor(){this.sort="name",this.pageNumber=1,this.pageSize=8,this.search="",this.categoryId=0,this.userId=0}}},7696:(x,f,r)=>{r.d(f,{P:()=>b});var e=r(1571),s=r(6895),m=r(2521),v=r(433);function g(p,c){if(1&p){const _=e.EpF();e.TgZ(0,"pagination",1),e.NdJ("pageChanged",function(a){e.CHM(_);const u=e.oxw();return e.KtG(u.onPagerChanged(a))}),e.qZA()}if(2&p){const _=e.oxw();e.Q6J("boundaryLinks",!0)("totalItems",_.totalCount)("itemsPerPage",_.pageSize)("maxSize",7)("ngModel",_.pageNumber)}}let b=(()=>{class p{constructor(){this.pageChanged=new e.vpe}onPagerChanged(_){this.pageChanged.emit(_.page)}}return p.\u0275fac=function(_){return new(_||p)},p.\u0275cmp=e.Xpm({type:p,selectors:[["app-pager"]],inputs:{totalCount:"totalCount",pageSize:"pageSize",pageNumber:"pageNumber"},outputs:{pageChanged:"pageChanged"},decls:1,vars:1,consts:[["previousText","\u2039","nextText","\u203a","firstText","\xab","lastText","\xbb",3,"boundaryLinks","totalItems","itemsPerPage","maxSize","ngModel","pageChanged",4,"ngIf"],["previousText","\u2039","nextText","\u203a","firstText","\xab","lastText","\xbb",3,"boundaryLinks","totalItems","itemsPerPage","maxSize","ngModel","pageChanged"]],template:function(_,t){1&_&&e.YNc(0,g,1,5,"pagination",0),2&_&&e.Q6J("ngIf",t.totalCount&&t.pageSize)},dependencies:[s.O5,m.Qt,v.JJ,v.On]}),p})()},1584:(x,f,r)=>{r.d(f,{K:()=>v});var e=r(2340),s=r(1571),m=r(529);let v=(()=>{class g{constructor(p){this.http=p,this.baseUrl=e.N.apiUrl}getUser(p){return this.http.get(this.baseUrl+"users/"+p)}getUserByEmail(p){return this.http.get(this.baseUrl+"users/email/"+p)}save(p){return this.http.post(this.baseUrl+`likes/save/${p}`,{})}unsave(p){return this.http.post(this.baseUrl+`likes/unsave/${p}`,{})}isSaved(p){return this.http.get(this.baseUrl+`likes/${p}`)}getSavedUsers(){return this.http.get(this.baseUrl+"likes")}}return g.\u0275fac=function(p){return new(p||g)(s.LFG(m.eN))},g.\u0275prov=s.Yz7({token:g,factory:g.\u0275fac,providedIn:"root"}),g})()}}]);