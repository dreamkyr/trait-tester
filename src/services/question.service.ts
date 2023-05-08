import { IQuestion } from '../interfaces';
import { StorageUtils } from '../utils';

export class QuestionService {
  static _sharedInstance: QuestionService;
  public questions: IQuestion[];
  public scores: { [symbol: string]: number };
  public isIntrovert: number;

  constructor() {
    this.questions = [];
    this.scores = StorageUtils.getAnswers() || {};
    this.isIntrovert = 0;
  }

  static getInstance() {
    if (!QuestionService._sharedInstance) {
      QuestionService._sharedInstance = new QuestionService();
    }
    return QuestionService._sharedInstance;
  }

  public setQuestions(questions: IQuestion[]) {
    this.questions = questions;
  }

  public updateScore(id: string, score: number) {
    this.scores[id] = score;
    this.calculateScore();
    StorageUtils.saveAnswers(this.scores);
  }

  public resetScores() {
    this.scores = {};
    this.isIntrovert = 0;
    StorageUtils.saveAnswers();
  }

  private calculateScore() {
    this.isIntrovert = 0;
    Object.values(this.scores).forEach(item => {
      this.isIntrovert += Number(item);
    });
  }

  public getScoreByQuestion(id: string) {
    return this.scores[id];
  }

  public async loadAnswers(questionId: string) {
    try {
    } catch (error) {}
  }
}
