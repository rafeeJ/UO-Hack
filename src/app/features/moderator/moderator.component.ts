import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { FireLayerService } from 'src/app/services/fire-layer/fire-layer.service';
import { Challenge } from 'src/app/services/fire-layer/challenge';
import { Submission } from 'src/app/services/fire-layer/submission';
import { User } from 'src/app/services/fire-layer/user';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.scss']
})
export class ModeratorComponent implements OnInit {

  challenges: Challenge[] = [];
  currentChallengeIndex = 0;
  currentChallenge: Challenge;
  submissions: Submission[] = [];
  user: User;

  constructor(
    private fireLayerService: FireLayerService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user_input => {
      // Set the current user.
      this.user = user_input;
      // console.log("user: "+this.user);
    });
    // Get all the challenges.
    this.fireLayerService.getAllChallenges().subscribe(challengeQueryResult => {
      // Todo: Check if challenge has any unmarked submissions.
      var newChallenges: Challenge[] = [];
      challengeQueryResult.forEach(challengeDocument => {
        newChallenges.push(challengeDocument.payload.doc.data());
      })
      this.challenges = newChallenges;
      // Set the currentChallenge.
      this.currentChallenge = this.challenges[this.currentChallengeIndex];
      // Set submissions for currentChallenge.
      this.submissions = this.getSubmissions(this.currentChallenge);
    });
  }

  getSubmissions(challenge: Challenge): Submission[] {
    var submissions: Submission[] = [];
    // Get all submission objects.
    var i;
    for (i = 0; i < challenge.submissions.length; i++) {
      // Get submission and add to submissions.
      this.fireLayerService.getSubmission(String(challenge.submissions[i])).subscribe(submissionQueryResult => {
        // Only add un-marked submissions.
        if (submissionQueryResult.data().correct == undefined) {
          submissions.push(submissionQueryResult.data())
        }
      })
    }
    return submissions
  }

  acceptSubmission(challenge: Challenge, submission: Submission) {
    // Set submission as complete true.
    submission.correct = true;
    // Update submission in firestrore.
    this.fireLayerService.updateSubmission(submission);
    // Increment score of user.
    this.fireLayerService.getUser(submission.submitterUID).subscribe(userDocumentSnapshot => {
      let submitter = userDocumentSnapshot.data();
      submitter.points++;
      this.fireLayerService.updateUser(submitter);
    })
    // Get submissions again.
    this.submissions = this.getSubmissions(this.currentChallenge);
  }

  rejectSubmission(challenge: Challenge, submission: Submission) {
    // Set submission as complete false.
    submission.correct = false;
    // Update submission in firestrore.
    this.fireLayerService.updateSubmission(submission);
    // Get submissions again.
    this.submissions = this.getSubmissions(this.currentChallenge);
  }

  previousChallenge() {
    // Update current challenge.
    this.currentChallengeIndex--;
    this.currentChallenge = this.challenges[this.currentChallengeIndex];
    // Get submissions for the new current challenge.
    this.submissions = this.getSubmissions(this.currentChallenge);
  }

  nextChallenge() {
    // Update current challenge.
    this.currentChallengeIndex++;
    this.currentChallenge = this.challenges[this.currentChallengeIndex];
    // Get submissions for the new current challenge.
    this.submissions = this.getSubmissions(this.currentChallenge);
    console.log(this.currentChallengeIndex);
    console.log(this.challenges.length);
    console.log(this.currentChallengeIndex >= this.challenges.length)
  }

}
