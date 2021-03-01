class PerformanceSerializer {
  static getPerformanceDetails(performance) {
    
    let allowedAttributes = [
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

    let serializedPerformance = {}

    for (let attribute of allowedAttributes) {
      serializedPerformance[attribute] = performance[attribute]
    }
    
    return serializedPerformance
  }

}

export default PerformanceSerializer