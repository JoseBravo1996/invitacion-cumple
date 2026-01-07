import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  nombre = '';
  asistencia = '';
  enviado = false;
  enviando = false;
  fechaActual = new Date();
  private fechaInterval: any;
  particles: number[] = [];

  constructor(
    private firestore: Firestore,
    private cdr: ChangeDetectorRef
  ) {}

  // Validar si el formulario está completo
  get formularioValido(): boolean {
    return this.nombre.trim().length > 0 && this.asistencia.length > 0 && !this.enviando;
  }

  // Verificar si va a asistir
  get vaAsistir(): boolean {
    return this.asistencia === 'Si';
  }

  // Verificar si es "Tal vez"
  get talVez(): boolean {
    return this.asistencia === 'TalVez';
  }

  ngOnInit() {
    // Actualizar fecha cada segundo
    this.fechaInterval = setInterval(() => {
      this.fechaActual = new Date();
    }, 1000);

    // Crear partículas flotantes
    this.particles = Array.from({ length: 20 }, (_, i) => i);
    
    // Asignar posiciones aleatorias a las partículas después de que se rendericen
    setTimeout(() => {
      this.particles.forEach((_, index) => {
        const element = document.querySelector(`.particle:nth-child(${index + 1})`) as HTMLElement;
        if (element) {
          const randomX = Math.random() * 100 - 50;
          const randomDelay = Math.random() * 5;
          element.style.setProperty('--random', String(Math.random() * 2));
          element.style.left = `${50 + randomX}%`;
          element.style.animationDelay = `${randomDelay}s`;
        }
      });
    }, 100);
  }

  ngOnDestroy() {
    if (this.fechaInterval) {
      clearInterval(this.fechaInterval);
    }
  }

  confirmar() {
    // Validación adicional por si acaso
    if (!this.formularioValido) {
      return;
    }

    this.enviando = true;
    this.cdr.detectChanges(); // Forzar detección de cambios inmediata

    const timestampLocal = new Date().toISOString();
    
    // Usar .then() y .catch() para mejor control del flujo
    addDoc(collection(this.firestore, 'confirmaciones'), {
      nombre: this.nombre.trim(),
      asistencia: this.asistencia,
      fecha: serverTimestamp(),
      timestamp: timestampLocal,
      enviadoEn: timestampLocal
    })
    .then((docRef) => {
      // Éxito: el documento se creó
      console.log('Documento creado con ID:', docRef.id);
      this.enviado = true;
      this.enviando = false;
      this.cdr.detectChanges(); // Forzar actualización de la vista
    })
    .catch((error) => {
      // Error al crear el documento
      console.error('Error al enviar confirmación:', error);
      this.enviando = false;
      this.cdr.detectChanges();
      alert('Error al enviar la confirmación. Por favor, verifica tu conexión e intenta nuevamente.');
    });
  }

  resetear() {
    this.enviado = false;
    this.nombre = '';
    this.asistencia = '';
  }
}
