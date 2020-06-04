import { ErrorHandlerService } from './core/error-handler.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ProdutosModule } from './produtos/produtos.module';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasPesquisaComponent } from './categorias/categorias-pesquisa/categorias-pesquisa.component';
import { CategoriasService } from './categorias/categorias.service';
import { ProdutosPesquisaComponent } from './produtos/produtos-pesquisa/produtos-pesquisa.component';
import { ProdutosService } from './produtos/produtos.service';
import { HttpClientModule } from '@angular/common/http';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from 'primeng/toast';
import { CategoriasCadastroComponent } from './categorias/categorias-cadastro/categorias-cadastro.component';
import { ProdutosCadastroComponent } from './produtos/produtos-cadastro/produtos-cadastro.component';


const routes: Routes = [
  {path: 'categorias', component: CategoriasPesquisaComponent},
  {path: 'produtos', component: ProdutosPesquisaComponent},
  {path: 'categorias/novo', component: CategoriasCadastroComponent},
  {path: 'produtos/novo', component: ProdutosCadastroComponent}
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    AppRoutingModule,
    CoreModule, 
    CategoriasModule,
    ProdutosModule,
    ConfirmDialogModule,
    ToastModule
   
  ],
  providers: [CategoriasService,
     ProdutosService, 
     ConfirmationService,
     MessageService,
    ErrorHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
