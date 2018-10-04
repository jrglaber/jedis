import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Status } from './Status';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private statusCollection: AngularFirestoreCollection<Status>;

  constructor(private db: AngularFirestore) {
    this.statusCollection = db.collection<Status>('status');
  }

  getStatus(): Observable<Status[]> {
    return this.statusCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Status;
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  getReference(id: string) {
    return this.statusCollection.doc(id).ref;
  }

  getStatusPorId(id: string) {
    return this.statusCollection.doc(id).valueChanges();
  }
}
