var KipyoSentence = (function(){
    'use strict';
    
    
    // $KPYT,1,fused:root,38.467416,27.159084,1423167000,90,90
    // $KPYG,1,fused:root,38.467416,27.159084,1423167000,90,90,10,1
    var fieldSeperator = ',';
    var sentenceSeperator = ';';
    
    
    // 1. Kipyo tracking sentence : $KPYT
    // $KPYT includes 8 tokens (8 fields about tracking)
    // @Identifier, @Device id, @Provider, @Latitude, @Longitude, @Date, @Speed, @Direction
    var kpytTokenLength = 8;
    var kpytIdentifier = 'KPYT';
    
    
    // 2. Kipyo geofencing sentence: $KPYG
    // $KPYG includes 10 tokens (10 fields about tracking)
    // @Identifier, @Device id, @Provider, @Latitude, @Longitude, @Date, @Speed, @Direction, @Geofence id, @Geofencing type
    var kpygTokenLength = 10;
    var kpygIdentifier = 'KPYG';
    
    var protocol = {};

    protocol.parse = function(sentence){
        
        if((typeof sentence)!== 'string') throw new Error('sentence parameter is not a string');
        if(sentence.length === 0) throw new Error('sentence length can not be 0');
             
        
        var merged = sentence.split(sentenceSeperator);
        
        if(merged.length === 1) return protocol.parseSingle(sentence);
        
        if(merged.length > 1) return protocol.parseMerged(merged);
        
        throw new Error('sentence parameter is not a string');
    };
    
    

    protocol.parseMerged = function(merged){
        
        /*********************************************************
        * Multi (merged)
        * $KPYT,1,fused:root,38.467416,27.159084,1423167000,90,90;
        * $KPYT,1,fused:root,38.467332,27.159461,1423167010,88,90;
        * $KPYT,1,fused:root,38.467227,27.159606,1423167020,85,90;
        * $KPYT,1,fused:root,38.467148,27.159727,1423167030,88,90;
        * $KPYT,1,fused:root,38.467048,27.159889,1423174140,92,90
        **********************************************************/

        var sentences = [];
        for(var i = 0; i < merged.length; i++){
            sentences.push(protocol.parseSingle(merged[i]));
        }
        return sentences;
    };

    protocol.parseSingle = function(sentence){
        
        /*********************************************************
        * Single
        * $KPYT,1,fused:root,38.467416,27.159084,1423167000,90,90
        **********************************************************/
        var tokens = sentence.split(fieldSeperator);
        
        if(tokens.length !== kpytTokenLength && tokens.length !== kpygTokenLength) 
            throw new Error('Token length error');

        var identifier = tokens[0].substring(1);
        
        if(identifier !== kpytIdentifier && identifier !== kpygIdentifier)
            throw new Error('Identifier error');


        /*  Kipyo tracking sentence $KPYT
            1. @Identifier
            2. @Device id
            3. @Provider
            4. @Latitude
            5. @Longitude
            6. @Date
            7. @Speed
            8. @Direction
        */
        if(identifier === kpytIdentifier){
            if(tokens.length === kpytTokenLength){
                return {
                    identifier: identifier,
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

        /*  Kipyo geofencing sentence $KPYG
            1. @Identifier
            2. @Device id
            3. @Provider
            4. @Latitude
            5. @Longitude
            6. @Date
            7. @Speed
            8. @Direction
            9. @Geofence id
            10. @Geofencing type
        */
        if(identifier === kpygIdentifier){
            if(tokens.length === kpygTokenLength){
                return {
                    identifier: identifier,
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

        throw new Error('Sentence cant recognized');
    }

    return protocol;
}());

module.exports = KipyoSentence;
