class PerformanceSerializer {
  static getPerformanceDetails(performance) {
    
    const allowedAttributes = ['id', 'stagePresence', 'vocalPerformance', 'numOfDrinks', 'audienceReaction', 'venue', 'notes', 'videoFile', 'userId', 'songId', 'createdAt']
    const serializedPerformance = {}

    for (const attribute of allowedAttributes) {
      serializedPerformance[attribute] = performance[attribute]
    }

    serializedPerformance.overAllPerformanceScore = ((serializedPerformance.stagePresence + serializedPerformance.vocalPerformance  + serializedPerformance.audienceReaction) / 3).toFixed(2)
    

    return serializedPerformance
  }

}

export default PerformanceSerializer