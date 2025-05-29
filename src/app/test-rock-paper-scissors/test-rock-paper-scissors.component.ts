import { Component } from '@angular/core';
import { filter, forkJoin, map, Observable, reduce, Subject, switchMap, take, tap } from 'rxjs';



@Component({
  selector: 'app-test-rock-paper-scissors',
  standalone: true,
  imports: [],
  templateUrl: './test-rock-paper-scissors.component.html',
  styleUrl: './test-rock-paper-scissors.component.css'
})
export class TestRockPaperScissorsComponent {
  humanChoice = new Subject<string | undefined>();
  computerChoice = new Subject<choice>();

  sanitizedHumanChoice$: Observable<choice> = this.humanChoice.pipe(
    filter(val => val == 'rock' || val == 'paper' || val == 'scissors'),
  );

  newRound = new Subject<void>();

  round$: Observable<score> = this.newRound.pipe(
    switchMap(() => forkJoin([this.sanitizedHumanChoice$.pipe(take(1)), this.computerChoice.pipe(take(1))])),
    map(([hc, cc]) => {
      const result = victoryMap[hc][cc];
      if (result == 'win')
        return {humanScore: 1, computerScore: 0};
      else if (result == 'lose')
        return {humanScore: 0, computerScore: 1};
      return {humanScore: 0, computerScore: 0};
    }),
  );

  game$ = this.round$.pipe(
    take(5),
    reduce((total, currentRound) => {
      total.humanScore += currentRound.humanScore;
      total.computerScore += currentRound.computerScore;
      return total;
    },
    {humanScore: 0, computerScore: 0}),
    map(result => {
      return `Human Score: ${result.humanScore}, Computer Score: ${result.computerScore}`;
    })
  );

  ngOnInit() {
    for(let i = 0; i < 5; i++) {
      this.newRound.next();
      this.humanChoice.next(prompt("Rock, Paper or Scissors?")?.toLowerCase());
      this.computerChoice.next(getComputerChoice());
    }
  }
}

type choice = 'rock' | 'paper' | 'scissors';

type score = {
  humanScore: number;
  computerScore: number;
}

const victoryMap = {
  rock: {
    rock: 'tie',
    paper: 'lose',
    scissors: 'win',
  },
  paper: {
    rock: 'win',
    paper: 'tie',
    scissors: 'lose',
  },
  scissors: {
    rock: 'lose',
    paper: 'win',
    scissors: 'tie',
  }
};

// Generate Computer Selection Based on randomValue 
function getComputerChoice() {
  const randomValue = Math.floor(Math.random() * 4);
    if (randomValue <= 1) {
        console.log("Computer has chosen rock!");
        return "rock";
    } else if (randomValue > 1 && randomValue <= 2) {
        console.log("Computer has chosen paper!");
        return "paper";
    } else {
        console.log("Computer has chosen scissors!");
        return "scissors";
    }
}