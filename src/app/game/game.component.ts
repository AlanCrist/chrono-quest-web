import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

class Quest {
  constructor(
    public era: string,
    public challenge: string,
    public options: string[],
    public correctOption: string,
    public feedback: string,
    public img: string,
  ) {}
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  private resetQuest$: Subject<void> = new Subject<void>();
  private quests: Quest[] = [];
  public currentQuestIndex: number = 0;
  public totalQuests: number = 0;

  currentQuest$: BehaviorSubject<Quest | null> = new BehaviorSubject<Quest | null>(null);
  isCorrectOption$: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);

  // Add a property to track whether the hieroglyphs are deciphered
  isHieroglyphsDeciphered: boolean = false;

  ngOnInit() {
    // Initialize the quests
    this.initQuests();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initQuests() {
    this.quests = [
      new Quest(
        'Ancient Era',
        'Decipher the hieroglyph to find the hidden treasure!',
        ['Obelisk', 'Scarab', 'Pyramid', 'Sphinx'],
        'Pyramid',
        'Congratulations! You deciphered the hieroglyph and found the hidden treasure!',
        'ancient'
      ),
      new Quest(
        'Futuristic Era',
        'Decode the code to access the spaceship!',
        ['R2D2', 'HAL 9000', 'C-3PO', 'Skynet'],
        'HAL 9000',
        'You have successfully decoded the code and gained access to the spaceship!',
        'futurista'
      ),
      new Quest(
        'Space Era',
        'Find the correct route to reach the unknown planet!',
        ['Alpha Centauri', 'Proxima Centauri', 'Sirius', 'Kepler-186f'],
        'Kepler-186f',
        'Well done! You have successfully navigated to the unknown planet!',
        'space',
      ),
      new Quest(
        'Medieval Era',
        'Help the knight find the path to the castle!',
        ['Left Bridge', 'Right Bridge', 'Underground Tunnel', 'Drawbridge'],
        'Drawbridge',
        'Great job! The knight has safely reached the castle!',
        'medieval',
      ),
      new Quest(
        'Prehistoric Era',
        'Discover which dinosaur is correct in this era!',
        ['Tyrannosaurus Rex', 'Velociraptor', 'Stegosaurus', 'Triceratops'],
        'Velociraptor',
        'You identified the correct dinosaur in this prehistoric era!',
        'prehistoric',
      ),
      new Quest(
        'Viking Era',
        'Choose the correct option to navigate the rough seas!',
        ['South', 'East', 'West', 'North'],
        'East',
        'Well done, brave Viking! You have successfully navigated the rough seas!',
        'vikings',
      ),
      new Quest(
        'Futuristic Era',
        'Find the correct sequence to open the spaceship door!',
        ['Blue, Red, Green', 'Green, Red, Blue', 'Red, Green, Blue', 'Blue, Green, Red'],
        'Red, Green, Blue',
        'Congratulations! The spaceship door is now open!',
        'futurista2'
      ),
      new Quest(
        'Modern Era',
        'Decipher the code to disarm the bomb!',
        ['1023', '9876', '2056', '4501'],
        '4501',
        'Phew! You successfully disarmed the bomb and saved the day!',
        'modern'
      ),
      new Quest(
        'Ancient Era',
        'Discover the correct statue in this temple!',
        ['Horus', 'Anubis', 'Osiris', 'Sobek'],
        'Horus',
        'Excellent! You found the correct statue and revealed its ancient secrets!',
        'ancient2'
      ),
      new Quest(
        'Space Era',
        'Choose the correct option to activate the spaceship engine!',
        ['Power', 'Thrust', 'Ignition', 'Propulsion'],
        'Propulsion',
        'Great choice! The spaceship engine is now activated!',
        'space2',
      ),
      // Add other quests here
      new Quest(
        'Aliens Era',
        'Choose the correct option to communicate with the aliens!',
        ['Hello', 'Greetings', 'Welcome', 'Salutations'],
        'Salutations',
        'Well done! You have successfully communicated with the aliens!',
        'aliens',
      ),
      new Quest(
        'AI Era',
        'Choose the correct option to desactivate the AI!',
        ['Shutdown', 'Power off', 'Deactivate', 'Turn off'],
        'Shutdown',
        'Congratulations! You have successfully desactivated the AI!',
        'ai',
      )
    ];

    this.totalQuests = this.quests.length;

    this.startNextQuest();
  }

  startNextQuest() {
    const nextQuest = this.quests[this.currentQuestIndex];
    this.currentQuest$.next(nextQuest || null);
    this.isCorrectOption$.next(null); // Reset the visual feedback
    this.isHieroglyphsDeciphered = false; // Reset the hieroglyph deciphered flag
  }

  submitOption(option: string) {
    const currentQuest = this.currentQuest$.getValue();

    if (currentQuest) {
      if (option === currentQuest.correctOption) {
        // Player answered correctly
        this.isCorrectOption$.next(true);
        this.completeQuest();
      } else {
        // Player answered incorrectly
        this.isCorrectOption$.next(false);

        // Reset the quest after 1 second in case of an incorrect answer
        this.resetQuest();
      }
    }
  }

  resetQuest() {
    // Reset the quest after 1 second
    timer(1000)
      .pipe(takeUntil(this.resetQuest$))
      .subscribe(() => {
        this.isCorrectOption$.next(null); // Reset the visual feedback
        this.startNextQuest();
      });
  }

  completeQuest() {
    this.currentQuestIndex++;

    if (this.currentQuestIndex === this.totalQuests) {
      // Player completed all the quests
      this.finishGame();
    } else {
      // There are more quests to complete
      this.startNextQuest();
    }
  }

  finishGame() {
    // You can add logic to finish the game and display the player's score here
    // For example, display a completion message and show the achieved score
  }

  // Add a method to decipher the hieroglyphs
  decipherHieroglyphs() {
    if (!this.isHieroglyphsDeciphered) {
      // Simulate the deciphering animation with a timer
      timer(1500)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          // Display the feedback based on the correct option
          const currentQuest = this.currentQuest$.getValue();
          if (currentQuest) {
            const isCorrect = currentQuest.correctOption === 'A'; // Replace 'A' with the actual correct option
            this.isCorrectOption$.next(isCorrect);
            if (isCorrect) {
              // Complete the quest after 1 second for correct answer
              timer(1000)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                  this.completeQuest();
                });
            } else {
              // Reset the quest after 1 second for incorrect answer
              this.resetQuest();
            }
          }
        });

      this.isHieroglyphsDeciphered = true;
    }
  }
}
