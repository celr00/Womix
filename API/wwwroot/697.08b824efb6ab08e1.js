"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[697],{7697:(T,a,r)=>{r.r(a),r.d(a,{UserModule:()=>P});var c=r(6895),n=r(2559),e=r(1571),d=r(8909),l=r(1584),u=r(5528),m=r(6325),v=r(7185),p=r(1106),h=r(9219);function f(s,i){if(1&s&&(e.TgZ(0,"div",5),e._UZ(1,"app-card",6),e.qZA()),2&s){const t=i.$implicit;e.xp6(1),e.Q6J("item",t)("showSellerName",!1)}}function g(s,i){if(1&s&&(e.TgZ(0,"div",5),e._UZ(1,"app-card",7),e.qZA()),2&s){const t=i.$implicit;e.xp6(1),e.Q6J("showSellerName",!1)("item",t)("type","service")}}function U(s,i){if(1&s&&(e.TgZ(0,"div",1),e._UZ(1,"app-user-card",2),e.TgZ(2,"div",3)(3,"h3"),e._uU(4,"Products"),e.qZA(),e.YNc(5,f,2,2,"div",4),e.qZA(),e.TgZ(6,"div",3)(7,"h3"),e._uU(8,"Services"),e.qZA(),e.YNc(9,g,2,3,"div",4),e.qZA()()),2&s){const t=e.oxw();e.xp6(1),e.Q6J("user",t.user),e.xp6(4),e.Q6J("ngForOf",t.products),e.xp6(4),e.Q6J("ngForOf",t.services)}}const S=[{path:":id",component:(()=>{class s{constructor(t,o,A,C,N,M){this.bcService=t,this.userService=o,this.route=A,this.productService=C,this.serviceService=N,this.toastr=M,this.products=[],this.services=[],this.id=Number(this.route.snapshot.paramMap.get("id")),this.productParams=this.productService.getParams(),this.serviceParams=this.serviceService.getParams()}ngOnInit(){this.loadUser(),this.productParams.userId=this.id,this.productService.setParams(this.productParams),this.serviceParams.userId=this.id,this.serviceService.setParams(this.serviceParams),this.loadProducts(),this.loadServices()}loadUser(){this.userService.getUser(this.id).subscribe({next:t=>{this.user=t,this.bcService.set("@userName",t.fullName)}})}loadProducts(){this.productService.getAll().subscribe({next:t=>{this.products=t.data}})}loadServices(){this.serviceService.getAll().subscribe({next:t=>{this.services=t.data}})}}return s.\u0275fac=function(t){return new(t||s)(e.Y36(d.pm),e.Y36(l.K),e.Y36(n.gz),e.Y36(u.M),e.Y36(m.r),e.Y36(v._W))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-user"]],decls:1,vars:1,consts:[["class","container-fluid container-xxl",4,"ngIf"],[1,"container-fluid","container-xxl"],[3,"user"],[1,"row"],["class","col-6 col-sm-4 col-md-3 col-lg-2",4,"ngFor","ngForOf"],[1,"col-6","col-sm-4","col-md-3","col-lg-2"],[3,"item","showSellerName"],[3,"showSellerName","item","type"]],template:function(t,o){1&t&&e.YNc(0,U,10,3,"div",0),2&t&&e.Q6J("ngIf",void 0!==o.user&&o.products&&o.services)},dependencies:[c.sg,c.O5,p.r,h.A]}),s})(),data:{breadcrumb:{alias:"userName"}}}];let x=(()=>{class s{}return s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[n.Bz.forChild(S),n.Bz]}),s})();var Z=r(4466);let P=(()=>{class s{}return s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[c.ez,x,Z.m]}),s})()}}]);