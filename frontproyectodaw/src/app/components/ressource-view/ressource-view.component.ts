import { Component, Inject, Input, ViewChild, OnInit } from '@angular/core';
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
export class RessourceViewComponent implements OnInit {

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

    console.log('Recurso recibido en el diálogo:', this.ressource);
  }

  ngOnInit(): void {
    this.GetsafeUrl();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  GetsafeUrl() : void {
    if (this.ressource.tipo === 'Video') {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.ressource.urlArchivo);
    } else {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:8080/api/resources/files/view/' + this.ressource.urlArchivo);
    }
  }

  // Método que se ejecuta cuando se agrega un comentario
  onCommentAdded(newComment: any) {
    console.log('Nuevo comentario recibido en el padre:', newComment);
    // Agregar el comentario a la lista del componente hijo
    this.commentsComponent.addNewComment(newComment);
  }
}