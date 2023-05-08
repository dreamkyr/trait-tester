import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  connectFirestoreEmulator,
  getDocs,
  collection,
} from 'firebase/firestore';

import { EnvConfig, FirebaseConfig } from '../config';
import { ENV_TYPE, IAnswer, IQuestion } from '../interfaces';

const app = initializeApp(FirebaseConfig.config, 'TraitTester');
const database = getFirestore(app);

if (EnvConfig.env === ENV_TYPE.LOCAL) {
  connectFirestoreEmulator(database, 'localhost', 8080);
}

export class FirebaseService {
  static _sharedInstance: FirebaseService;
  static app = app;
  static database = database;

  static getInstance() {
    if (!FirebaseService._sharedInstance) {
      FirebaseService._sharedInstance = new FirebaseService();
    }
    return FirebaseService._sharedInstance;
  }

  public async loadQuestions() {
    try {
      const result = await getDocs(collection(database, 'questions'));
      const data = await Promise.all(
        result.docs.map(async item => {
          const answers = await this.loadAnswers(item.id);
          return {
            id: item.id,
            ...item.data(),
            answers: answers?.sort((a, b) => a.order - b.order),
          } as IQuestion;
        })
      );
      return data?.sort((a, b) => a.order - b.order);
    } catch (error) {
      return [];
    }
  }

  public async loadAnswers(questionId: string) {
    try {
      const result = await getDocs(
        collection(database, `questions/${questionId}/answers`)
      );
      return result.docs.map(item => ({
        ...item.data(),
        id: item.id,
      })) as IAnswer[];
    } catch (error) {
      return [];
    }
  }
}
