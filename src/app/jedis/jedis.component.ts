import { Component, OnInit } from '@angular/core';
import { JediService } from '../jedi.service';
import { StatusService } from '../status.service';
import { Jedi } from '../Jedi';
import { Status } from '../Status';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-jedis',
  templateUrl: './jedis.component.html',
  styleUrls: ['./jedis.component.css']
})
export class JedisComponent implements OnInit {
  jedis: Observable<Jedi[]>;
  jedisArray: Jedi[];
  jediSelected: Jedi;
  titleModal: string = null;

  constructor(
    private jediService: JediService,
    private statusService: StatusService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getJedis();
  }

  get(obj) {
    console.dir(obj);
  }

  getJedis(): void {
    this.jedisArray = [];
    this.jedis = this.jediService.getJedis();
    this.jedis.forEach(next => {
      for (var i = 0; i < next.length; i++) {
        const obj = next[i];
        obj.status_description = {};
        const status = this.statusService.getStatusPorId(obj.status.id);
        status.forEach(nextSt => {
          obj.status_description = nextSt;
          // obj.status_description = nextSt.description;
        });
        this.jedisArray.push(obj);
      }
    });
    // this.jedis.forEach(next => {
    //   console.dir(next);
    // });
  }

  deleteJedi(jedi: Jedi): void {
    const confirmacao = confirm('Deseja remover ' + jedi.name);
    if (confirmacao) {
      this.jediService.deleteJedi(jedi);
      this.getJedis();
    }
  }

  newJedi(content): void {
    this.titleModal = 'Cadastrar';
    const newJedi = {
      id: null,
      name: null,
      planet: null,
      master: null,
      status_description: {},
      status: {
        id: null
      }
    };
    this.jediSelected = newJedi;
    this.openModal(content, newJedi);
  }

  editJedi(content, jedi): void {
    this.titleModal = 'Editar';
    jedi.status = {
      id: jedi.status.id
    };
    this.openModal(content, jedi);
  }

  openModal(content, jedi: Jedi) {
    this.jediSelected = jedi;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      try {
        if (this.jediSelected.name == null) {
          throw 'Campo NOME vazio';
        } else if (this.jediSelected.planet == null) {
          throw 'Campo PLANETA vazio';
        }  else if (this.jediSelected.status == null) {
          throw 'Deve ser selecionado um STATUS';
        } else {
          const saveJedi = {
            name: this.jediSelected.name,
            planet: this.jediSelected.planet,
            master: this.jediSelected.master,
            status: this.statusService.getReference(this.jediSelected.status.id),
          }
          if (this.jediSelected.id == null) {
            this.jediService.addJedi(saveJedi);
          } else {
            this.jediService.updateJedi(saveJedi, this.jediSelected.id);
          }
          this.getJedis();
          this.jediSelected = null;
        }
      } catch (err) {
        alert(err);
        this.openModal(content, this.jediSelected);
      }
    }, (reason) => {
      this.jediSelected = null;
    });
  }

  getStatus(id: string) {
    return this.statusService.getStatusPorId(id);
  }
}
