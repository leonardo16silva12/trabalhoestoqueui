import { ErrorHandlerService } from './../../core/error-handler.service';
import { MessageService } from 'primeng/api';
import { ProdutosService } from './../produtos.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produtos-cadastro',
  templateUrl: './produtos-cadastro.component.html',
  styleUrls: ['./produtos-cadastro.component.css']
})
export class ProdutosCadastroComponent implements OnInit {

  formulario: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private produtosService: ProdutosService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private router: Router,
  ) { 


  }

  ngOnInit() {
    this.configurarFormulario();

    const idProduto = this.route.snapshot.params['id'];

    if (idProduto){
      this.carregarProduto(idProduto);
    }
  }

  carregarProduto(id: number) {
    this.produtosService.buscarPorId(id)
    .then(produto => {
      this.formulario.patchValue(produto);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({

      id: [],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      preco: [null, [Validators.required, Validators.minLength(2)]],
      idcategoria: [null, [Validators.required, Validators.maxLength(3)]]
    });
  }

  get editando() {
    return Boolean(this.formulario.get('id').value);
  }

  salvar() {
    if (this.editando) {
      this.atualizarProduto();
    } 
    else 
    {
      this.adicionarProduto();
    }
  }

  adicionarProduto() {
    this.produtosService.adicionar(this.formulario.value)
    .then(produtoAdicionado => {
      this.messageService.add({severity: 'success', detail: 'Produto Adicionado com Sucesso!!!'});
   
      this.router.navigate(['/produtos']);
    }) .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarProduto() {
    this.produtosService.atualizar(this.formulario.value)
    .then(produto => {
      this.formulario.patchValue(produto);
      this.messageService.add({severity: 'success', detail: 'Produto Alterado com Sucesso!!!'});
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
