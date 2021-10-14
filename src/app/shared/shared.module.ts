import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputErrorComponent } from './components/input-error/input-error.component';

const declarations = [InputErrorComponent];
@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [CommonModule],
})
export class SharedModule {}
