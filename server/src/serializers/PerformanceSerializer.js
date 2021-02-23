class PerformanceSerializer {
  static getPerformanceDetails(performance) {
    
    const allowedAttributes = [
      'id', 
      'stagePresence', 
      'vocalPerformance', 
      'numOfDrinks', 
      'audienceReaction', 
      'venue', 
      'notes', 
      'videoFile', 
      'userId', 
      'songId', 
      'createdAt', 
      'performanceScore',
    ]

    const serializedPerformance = {}

    for (const attribute of allowedAttributes) {
      serializedPerformance[attribute] = performance[attribute]
    }
    
    return serializedPerformance
  }

}

export default PerformanceSerializer