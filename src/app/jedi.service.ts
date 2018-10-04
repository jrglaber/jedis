import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Jedi } from './Jedi';
import { StatusService } from './status.service';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class JediService {
  private jedisCollection: AngularFirestoreCollection<Jedi>;

  constructor(
    private db: AngularFirestore,
    private status: StatusService
  ) {
    this.jedisCollection = db.collection<Jedi>('jedi');
  }

  getJedis(): Observable<Jedi[]> {
    // return this.jedisCollection.valueChanges();
    return this.jedisCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Jedi;
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  getJedisCount(): Observable<Jedi[]> {
    // return this.jedisCollection.valueChanges();
    return this.jedisCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Jedi;
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  deleteJedi(jedi: Jedi): Promise<boolean> {
    return this.jedisCollection.doc(jedi.id).delete().then((response) => {
      console.dir(response);
      return true;
    }).catch((error) => {
      console.dir(error);
      return false;
    });
  }

  addJedi(jedi): void {
    this.jedisCollection.add(jedi).then((response) => {
      console.log('ID inserido: ' + response.id);
    }).catch((error) => {
      alert(error);
    });
  }

  updateJedi(jedi, id) {
    this.jedisCollection.doc(id).update(jedi).then((response) => {
      console.log('ID alterado: ' + id);
    }).catch((error) => {
      alert(error);
    });
  }
}
