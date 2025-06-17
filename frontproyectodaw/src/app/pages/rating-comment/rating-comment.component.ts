import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommentService } from '../../services/comment.service';
import { RatingService } from '../../services/rating.service';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { RatingCommentCreateComponent } from '../../components/rating-comment-create/rating-comment-create.component';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-rating-comment',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './rating-comment.component.html',
  styleUrl: './rating-comment.component.scss'
})
export class RatingCommentComponent {
  ratingForm: FormGroup

  isLoading: boolean = true;
  @Output() isCommentSaved: EventEmitter<any> = new EventEmitter<any>();
  @Output() isRatingSaved: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private commentService: CommentService,
    private ratingService: RatingService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.ratingForm = this.formBuilder.group({
      puntuacion: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const id = 1; // Recurso fijo para demostraciones
    this.loadComments(id);
  }
  listComments: any[] = [];
  listRatings: any[] = [];
  rating = 0;
  stars = Array(5).fill(0);

  pageSize = 5;
  currentPage = 1;

  loadComments(id : number): void {
    this.commentService.getCommentsByResourceId(id).subscribe({
      next: (data: any) => {
        this.listComments = data;
        this.isLoading = false;
        console.log(this.listComments);
        console.log('Comentarios cargadas con éxito', data);
      },
      error: (error) => {
        console.error('Error al cargar los comentarios', error);
      }
    });
    }

  loadUserRating(idUsuario: number, idRecurso: number) {
    this.ratingService.getRatingByUserAndResource(idUsuario, idRecurso).subscribe((resp) => {
      this.rating = resp?.puntuacion || 0;
    });
  }
  
  loadRatings(id: number): void {
    this.ratingService.getRatingsByResourceId(id).subscribe({ 
      next: (data: any) => {
        console.log('Valoraciones cargadas con éxito', data);
      },
      error: (error) => {
        console.error('Error al cargar valoraciones', error);
      }
    });
  }

    editRating(id: number) {
    if (this.ratingForm.valid) {
      const newRating = {
        nombre: this.ratingForm.get('puntuacion')?.value,
      };

      this.ratingService.updateRating(id, newRating).subscribe({
        next: (response:any) => {

          this.isRatingSaved.emit({
            isUpdated: true,
          });
          
          console.log('Rating editado con éxito', response);
          // Aquí puedes manejar la respuesta después de crear la categoría
        },
        error: (error:any) => {
          console.error('Error al editar el rating', error);
        }
      });
    }
  }
  
    openCommentCreateDialog() {
      const dialogRef = this.dialog.open(RatingCommentCreateComponent, {
        width: '400px',
        panelClass: 'custom-border-radius-dialog',
      });
  
      dialogRef.afterClosed().subscribe((isSaved: any) => {
        if (isSaved && isSaved.isCreated) {
          Swal.fire({
            icon: 'success',
            title: 'Comentario creado',
            text: 'El comentario se ha creado correctamente.',
            showConfirmButton: false,
            timer: 2500
          });
          
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/rating-comment']);
          });
        }
      });
    }
}