import { Component, Inject, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { RatingsResourceComponent } from '../ratings-resource/ratings-resource.component';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-ressource-view',
  imports: [
    CommonModule,
    RatingsResourceComponent,
    AddCommentComponent,
    MatButtonModule,
    MatIcon,
    MatCard,
    MatCardTitle,
    CommentsComponent
  ],
  templateUrl: './ressource-view.component.html',
  styleUrl: './ressource-view.component.scss'
})
export class RessourceViewComponent {

  @ViewChild('commentsComponent') commentsComponent!: CommentsComponent;

  ressource: any;
  safeUrl: any;
  addCommentVisible: boolean = false;  

  constructor(
    public dialogRef: MatDialogRef<RessourceViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { resourceObject: any },
    private sanitizer: DomSanitizer
  ) {
    this.ressource = data.resourceObject;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.ressource.urlArchivo);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  // Método que se ejecuta cuando se agrega un comentario
  onCommentAdded(newComment: any) {
    console.log('Nuevo comentario recibido en el padre:', newComment);
    // Agregar el comentario a la lista del componente hijo
    this.commentsComponent.addNewComment(newComment);
  }
}