import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-comments',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIcon,
    MatCard,
    MatCardTitle,
    FormsModule,
    MatCardModule
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {

  @Input() resource: any;
  comments: any[] = [];

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    if (this.resource && this.resource.id) {
      this.loadComments();
    } else {
      console.error('Resource ID is not available');
    }    
  }

  // Método para cargar los comentarios del recurso
  loadComments() {
    this.commentsService.getCommentsByResourceId(this.resource.id).subscribe({
      next: (comments: any) => {
        this.comments = comments;
        console.log('Comentarios cargados:', this.comments);
      },
      error: (error: any) => {
        console.error('Error al obtener los comentarios:', error);
      }
    });
  }

  // ¡AGREGAR ESTE MÉTODO PÚBLICO!
  addNewComment(newComment: any) {
    console.log('Agregando nuevo comentario a la lista:', newComment);
    // Agregar al inicio de la lista para que aparezca primero
    this.comments.unshift(newComment);
    // O si prefieres al final: this.comments.push(newComment);
  }
}