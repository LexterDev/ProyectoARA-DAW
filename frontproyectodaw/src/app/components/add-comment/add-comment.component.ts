import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentsService } from '../../services/comments.service';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Service } from '../../services/auth0.service';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-add-comment',
  imports: [
    MatButtonModule,
    MatCardModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.scss'
})
export class AddCommentComponent implements OnInit {

  @Input() resource: any;
  @Output() commentAdded = new EventEmitter<any>(); // ¡AGREGAR ESTA LÍNEA!

  commentText: string = '';
  auth0UserId: string = '';
  internalUserId: string = '';

  constructor(
    private commentsService: CommentsService,
    private authService: Auth0Service,
    private auth0Service: AuthService,
    private resourceService: ResourceService
  ) { }

  ngOnInit(): void {
    this.getUserAuth0Id();
    console.log('Recurso recibido:', this.resource);
  }

  submitComment() {
    if (this.commentText.trim() === '') {
      return; // No enviar comentarios vacíos
    }

    const comment = {
      recursoId: this.resource.id,
      contenido: this.commentText,
      usuarioId: this.internalUserId
    };

    this.commentsService.createComment(comment).subscribe({
      next: (response) => {
        console.log('Comentario enviado:', response);
        
        // ¡AQUÍ ES LA CLAVE! Emitir el evento al componente padre
        this.commentAdded.emit(response);
        
        this.commentText = ''; // Limpiar el campo de texto después de enviar
      },
      error: (error) => {
        console.error('Error al enviar el comentario:', error);
      }
    });
  }

  getUserAuth0Id(): any {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.auth0UserId = user?.sub;
        this.getInternalId(); 
      }
    });    
  }

  getInternalId(): any {
    const userId = this.auth0UserId;
    console.log('User ID:', userId);
    this.resourceService.getUserByAuth0Id(userId).subscribe({
      next: (user) => {
        this.internalUserId = user.id; // Almacena el ID del usuario interno
        console.log('ID del usuario interno:', this.internalUserId);
      },
      error: () => {
        console.error('Error al obtener el ID del usuario interno');
      }
    });
  }
}