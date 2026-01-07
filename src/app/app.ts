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

    // Crear partículas cuadradas dispersas
    this.particles = Array.from({ length: 80 }, (_, i) => i);
    
    // Asignar posiciones y movimientos aleatorios
    setTimeout(() => {
      const particleElements = document.querySelectorAll('.particle');
      particleElements.forEach((element) => {
        const el = element as HTMLElement;
        
        // Posición aleatoria en toda la pantalla
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Movimientos suaves y aleatorios
        const moveX = (Math.random() - 0.5) * 60; // -30px a 30px
        const moveY = (Math.random() - 0.5) * 60;
        const moveX2 = (Math.random() - 0.5) * 80;
        const moveY2 = (Math.random() - 0.5) * 80;
        const moveX3 = (Math.random() - 0.5) * 70;
        const moveY3 = (Math.random() - 0.5) * 70;
        
        // Delay aleatorio para que no todas empiecen al mismo tiempo
        const delay = Math.random() * 5;
        
        // Aplicar estilos
        el.style.left = `${x}%`;
        el.style.top = `${y}%`;
        el.style.setProperty('--move-x', `${moveX}px`);
        el.style.setProperty('--move-y', `${moveY}px`);
        el.style.setProperty('--move-x2', `${moveX2}px`);
        el.style.setProperty('--move-y2', `${moveY2}px`);
        el.style.setProperty('--move-x3', `${moveX3}px`);
        el.style.setProperty('--move-y3', `${moveY3}px`);
        el.style.animationDelay = `${delay}s`;
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
