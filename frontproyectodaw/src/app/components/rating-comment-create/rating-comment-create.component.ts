import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { CommentService } from'../../services/comment.service';
import { MatIcon } from '@angular/material/icon';

@Component({ 
  selector: 'app-rating-comment-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIcon
  ],
  templateUrl: './rating-comment-create.component.html',
  styleUrls: ['./rating-comment-create.component.scss']
})
export class RatingCommentCreateComponent {

  commentForm: FormGroup;

  @Output() isCommentSaved = new EventEmitter<any>();

  // Recurso fijo
  private readonly RESOURCE_ID = 1;

  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: {}, 
    private dialogRef: MatDialogRef<RatingCommentCreateComponent>,
    private formBuilder: FormBuilder,
    private commentService: CommentService
  ){
    this.commentForm = this.formBuilder.group({ 
      content: ['', [Validators.required]] 
    });
  }
  
  closeCategoriesCreateDialog() {
    this.dialogRef.close();
  }
  
  createComment() {
    if (this.commentForm.valid) {
      const newComment = {
        idRecurso: this.RESOURCE_ID,
        contenido: this.commentForm.get('content')?.value,
        fecha: new Date()
      };
  
      this.commentService.createComment(newComment).subscribe({ 
        next: (response) => {
          this.isCommentSaved.emit({ isCreated: true });
          console.log('Comentario creada con éxito', response);
          this.closeCategoriesCreateDialog();
        },
        error: (error) => {
          console.error('Error al crear el comentario', error);
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}

