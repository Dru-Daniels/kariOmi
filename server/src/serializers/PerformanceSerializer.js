class PerformanceSerializer {
  static getSummary(performance) {
    const allowedAttributes = ['id', 'stagePresence', 'vocalPerformance', 'numOfDrinks', 'audienceReaction', 'venue', 'notes', 'videoFile', 'userId', 'songId']
    const serializedPerformance = {}

    for (const attribute of allowedAttributes) {
      serializedPerformance[attribute] = performance[attribute]
    }

    return serializedPerformance
  }

}

export default PerformanceSerializer