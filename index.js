var KipyoSentence = (function(){
    'use strict';
    
    
    var sentence = {
        seperator : ',',
        kpytLength : 8,
        kpygLength : 10,
        kpytIdentifier : 'KPYT',
        kpygIdentifier : 'KPYG'
    }
   
    sentence.parse = function(s){
        
        if((typeof s) !== 'string')
                throw new Error('Sentence is not a string');
            
            var tokens = s.split(sentence.seperator);
            if(tokens.length !== sentence.kpytLength && tokens.length !== sentence.kpygLength)
                throw new Error('Sentence is $KPYT or $KPYG, not enough length');
            
            var identifier = tokens[0].substring(1);
            if(identifier !== sentence.kpytIdentifier && identifier !== sentence.kpygIdentifier)
                throw new Error('Sentence is not KIPYO, not identified sentence');
            
            /* 1. Kipyo tracking sentence $KPYT
                @Identifier,
                @Device id,
                @Provider,
                @Latitude,
                @Longitude,
                @Date,
                @Speed,
                @Direction
            */
            if(identifier === sentence.kpytIdentifier){
                if(tokens.length === sentence.kpytLength){
                    return {
                        device: tokens[1],
                        provider: tokens[2],
                        latitude: tokens[3],
                        longitude: tokens[4],
                        date: tokens[5],
                        speed: tokens[6],
                        direction: tokens[7]
                    }
                }
            }
            
            /* 2. Kipyo geofencing sentence $KPYG
                    @Identifier,
                    @Device id,
                    @Provider,
                    @Latitude,
                    @Longitude,
                    @Date,
                    @Speed,
                    @Direction,
                    @Geofence id
                    @Geofencing type
            */
            if(identifier === sentence.kpygIdentifier){
                if(tokens.length === sentence.kpygLength){
                    return {
                        device: tokens[1],
                        provider: tokens[2],
                        latitude: tokens[3],
                        longitude: tokens[4],
                        date: tokens[5],
                        speed: tokens[6],
                        direction: tokens[7],
                        geofence: tokens[8],
                        geotype: tokens[9]
                    }
                }
            }
            
            throw new Error('Sentence cant recognised');
    }
    return sentence;
}());

module.exports = KipyoSentence;