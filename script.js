/* ----------------------------------------------------
   AI ENGINE — ADAPTIVE QUESTION SELECTION
----------------------------------------------------*/

const AIEngine = {
    userModel: {
        accuracy: 1,
        streak: 0,
        difficulty: 1, // 1 = easy, 2 = medium, 3 = hard
        history: []
    },

    updateModel(isCorrect) {
        const model = this.userModel;

        model.history.push(isCorrect);

        // Update accuracy
        const correctCount = model.history.filter(x => x).length;
        model.accuracy = correctCount / model.history.length;

        // Update streak
        model.streak = isCorrect ? model.streak + 1 : 0;

        // Adaptive difficulty logic
        if (model.streak >= 3 && model.difficulty < 3) {
            model.difficulty++;
        } else if (!isCorrect && model.difficulty > 1) {
            model.difficulty--;
        }
    },

    getNextQuestion(topicQuestions) {
        const diff = this.userModel.difficulty;

        const filtered = topicQuestions.filter(q => q.difficulty === diff);

        // fallback if no questions exist at that difficulty
        if (filtered.length === 0) return topicQuestions[Math.floor(Math.random() * topicQuestions.length)];

        return filtered[Math.floor(Math.random() * filtered.length)];
    }
};
