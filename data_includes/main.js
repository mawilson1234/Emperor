PennController.ResetPrefix(null) // Shorten command names (keep this line here)
DebugOff()

function SepWithN(sep, main, n) {
    this.args = [sep,main];

    this.run = function(arrays) {
        assert(arrays.length == 2, "Wrong number of arguments (or bad argument) to SepWithN");
        assert(parseInt(n) > 0, "N must be a positive number");
        let sep = arrays[0];
        let main = arrays[1];

        if (main.length <= 1)
            return main
        else {
            let newArray = [];
            while (main.length){
                for (let i = 0; i < n && main.length>0; i++)
                    newArray.push(main.pop());
                for (let j = 0; j < sep.length && main.length > 0; ++j)
                    newArray.push(sep[j]);
            }
            return newArray;
        }
    }
}
function sepWithN(sep, main, n) { return new SepWithN(sep, main, n); }

SetCounter('setcounter');

Sequence('setcounter', 'consent', 'instructions1', 'instructions2', 'instructions3', 'instructions4',
    randomize('trial_prac'), 'post-practice',
    sepWithN('break', rshuffle('trial_agr-att', 'trial_that', 'trial_experiencer', 'trial_filler', 'trial_whif'), 43),
    'feedback', 'botcheck', SendResults(), 'bye')


newTrial('consent',
    newHtml('consent', 'consent.html')
        .print()
        .log()
    ,
    newFunction( () =>
        $("#consentcx").change(e => {
                if(e.target.checked) getButton('Next').enable()._runPromises();
                else getButton('Next').disable()._runPromises();
            }
        )
    ).call()
    ,
    newButton('Next', 'Next')
        .before(newText('<br /><br />').print())
        .center()
        .print()
        .disable()
        .wait()
)

newTrial('instructions1',
    newHtml('instructions1', 'instructions1.html')
        .print()
        .log()
    ,
    newButton('Next', 'Next')
        .before(newText('<br /><br />').print())
        .center()
        .print()
        .wait()
)

newTrial('instructions2',
    newHtml('instructions2', 'instructions2.html')
        .print()
        .log()
    ,
    newButton('Next', 'Next')
        .before(newText('<br /><br />').print())
        .center()
        .print()
        .wait()
)

newTrial('instructions3',
    newHtml('instructions3', 'instructions3.html')
        .print()
        .log()
    ,
    newButton('Next', 'Next')
        .before(newText('<br /><br />').print())
        .center()
        .print()
        .wait()
)

newTrial('instructions4',
    newHtml('instructions4', 'instructions4.html')
        .print()
        .log()
    ,
    newButton('Next', 'Next')
        .before(newText('<br /><br />').print())
        .center()
        .print()
        .wait()
)

Template('practice.csv', variable => ['trial_prac',
    'Separator', {transfer: 1000,
                  normalMessage: '+'}
    ,
    'EPDashedSentence', {s: variable.Sentence, 
                         mode: 'speeded acceptability', 
                         display: 'in place', 
                         blankText: '+', 
                         wordTime: 325, 
                         wordPauseTime: 0}
    ,
    'QuestionAlt', {q: 'Was the sentence grammatical?', 
                    as: [['f', 'Yes'], ['j', 'No']], 
                    randomOrder: false, 
                    presentHorizontally: true, 
                    timeout: 2000}
    ,
    'Separator', {transfer: 2000,  
                  normalMessage: '',
                  errorMessage: 'Timed out. Please respond more quickly.'}
    ,
    'PennController', PennController()
        .log(variable.Sentence)
   ]
)

newTrial('post-practice',
    newText('post-pr', 'That\'s it for practice! Click below when you\'re ready to begin the experiment.<br /><br />')
        .center()
        .print()
    ,

    newButton('Click', 'Click here to begin the experiment')
        .center()
        .print()
        .wait()
)

newTrial('break',
    newText('You may now take a short break. Click below when you are ready to return to the experiment.')
        .center()
        .print()
    ,
    newButton('click', 'Click here to return to the experiment')
        .before(newText('<br /><br />').print())
        .center()
        .print()
        .wait()
)

Template('agr-att.csv', variable => ['trial_agr-att',
    'Separator', {transfer: 1000,
                  normalMessage: '+'}
    ,
    'EPDashedSentence', {s: variable.Sentence, 
                         mode: 'speeded acceptability', 
                         display: 'in place', 
                         blankText: '+', 
                         wordTime: 325, 
                         wordPauseTime: 0}
    ,
    'QuestionAlt', {q: 'Was the sentence grammatical?', 
                    as: [['f', 'Yes'], ['j', 'No']], 
                    randomOrder: false, 
                    presentHorizontally: true, 
                    timeout: 2000}
    ,
    'Separator', {transfer: 2000,  
                  normalMessage: '',
                  errorMessage: 'Timed out. Please respond more quickly.'}
    ,
    'PennController', PennController()
        .log(variable.Group)
        .log(variable.Item)
        .log(variable.Gram)
        .log(variable.Match)
        .log(variable.Comp)
        .log(variable.Sentence)
   ]
)

Template('that.csv', variable => ['trial_that',
    'Separator', {transfer: 1000,
                  normalMessage: '+'}
    ,
    'EPDashedSentence', {s: variable.Sentence, 
                         mode: 'speeded acceptability', 
                         display: 'in place', 
                         blankText: '+', 
                         wordTime: 325, 
                         wordPauseTime: 0}
    ,
    'QuestionAlt', {q: 'Was the sentence grammatical?', 
                    as: [['f', 'Yes'], ['j', 'No']], 
                    randomOrder: false, 
                    presentHorizontally: true, 
                    timeout: 2000}
    ,
    'Separator', {transfer: 2000,  
                  normalMessage: '',
                  errorMessage: 'Timed out. Please respond more quickly.'}
    ,
    'PennController', PennController()
        .log(variable.Group)
        .log(variable.Item)
        .log(variable.Extraction)
        .log(variable.Comp)
        .log(variable.Sentence)
   ]
)

Template('experiencer.csv', variable => ['trial_experiencer',
    'Separator', {transfer: 1000,
                  normalMessage: '+'}
    ,
    'EPDashedSentence', {s: variable.Sentence, 
                         mode: 'speeded acceptability', 
                         display: 'in place', 
                         blankText: '+', 
                         wordTime: 325, 
                         wordPauseTime: 0}
    ,
    'QuestionAlt', {q: 'Was the sentence grammatical?', 
                    as: [['f', 'Yes'], ['j', 'No']], 
                    randomOrder: false, 
                    presentHorizontally: true, 
                    timeout: 2000}
    ,
    'Separator', {transfer: 2000,  
                  normalMessage: '',
                  errorMessage: 'Timed out. Please respond more quickly.'}
    ,
    'PennController', PennController()
        .log(variable.Group)
        .log(variable.Item)
        .log(variable.Verb)
        .log(variable.VerbType)
        .log(variable.SentenceVoice)
        .log(variable.VerbFrequency)
        .log(variable.VerbLength)
        .log(variable.EmotionalValence)
        .log(variable.EVPairType)
        .log(variable.Sentence)
   ]
)

Template('fillers.csv', variable => ['trial_filler',
    'Separator', {transfer: 1000,
                  normalMessage: '+'}
    ,
    'EPDashedSentence', {s: variable.Sentence, 
                         mode: 'speeded acceptability', 
                         display: 'in place', 
                         blankText: '+', 
                         wordTime: 325, 
                         wordPauseTime: 0}
    ,
    'QuestionAlt', {q: 'Was the sentence grammatical?', 
                    as: [['f', 'Yes'], ['j', 'No']], 
                    randomOrder: false, 
                    presentHorizontally: true, 
                    timeout: 2000}
    ,
    'Separator', {transfer: 2000,  
                  normalMessage: '',
                  errorMessage: 'Timed out. Please respond more quickly.'}
    ,
    'PennController', PennController()
        .log(variable.Group)
        .log(variable.Item)
        .log(variable.Gram)
        .log(variable.Type)
        .log(variable.Sentence)
   ]
)

Template('whif.csv', variable => ['trial_whif',
    'Separator', {transfer: 1000,
                  normalMessage: '+'}
    ,
    'EPDashedSentence', {s: variable.Sentence, 
                         mode: 'speeded acceptability', 
                         display: 'in place', 
                         blankText: '+', 
                         wordTime: 325, 
                         wordPauseTime: 0}
    ,
    'QuestionAlt', {q: 'Was the sentence grammatical?', 
                    as: [['f', 'Yes'], ['j', 'No']], 
                    randomOrder: false, 
                    presentHorizontally: true, 
                    timeout: 2000}
    ,
    'Separator', {transfer: 2000,  
                  normalMessage: '',
                  errorMessage: 'Timed out. Please respond more quickly.'}
    ,
    'PennController', PennController()
        .log(variable.Group)
        .log(variable.Item)
        .log(variable.Structure)
        .log(variable.GapPosition)
        .log(variable.Sentence)
   ]
)

newTrial('feedback',
    newText('That\'s it for the experiment! We have just a few follow-up questions that will help us interpret your responses.<br /><br />')
        .settings.css('margin-left', '50px')
        .print()
    ,
    newText('feedback_instruction','What, if anything, stood out to you about the sentences that you saw?<br /><br />')
        .settings.css('margin-left', '50px')
        .print()
    ,
    newTextInput('feedback')
        .cssContainer('text-align', 'center')
        .log()
        .lines(10)
        .print()
    ,

    newText('difficulties_instructions', '<br /><br />Did you experience any difficulties (technical or otherwise) in doing the experiment? <br /><br />')
        .settings.css('margin-left', '50px')
        .print()
    ,
    newTextInput('difficulties')
        .cssContainer('text-align', 'center')
        .log()
        .lines(10)
        .print()
    ,

    newText('device_instructions', '<br /><br />What device/OS did you use to complete the experiment?<br /><br />')
        .settings.css('margin-left', '50px')
        .print()
    ,
    newDropDown('device', 'Choose your device/OS')
        .add('Windows laptop or desktop', 'Apple Macintosh laptop or desktop',
             'Chrome OS laptop or desktop', 'Unix/Linux laptop or desktop',
             'Other OS laptop or desktop', 'Other device')
        .center()
        .print()
    ,
    newButton('Next','Next')
        .before(newText('<br /><br />').print())
        .center()
        .print()
        .disable()
    ,
    getDropDown('device')
        .wait()
        .log()
    ,

    getButton('Next')
        .enable()
        .wait()
)

newTrial('botcheck',
    newText('bot_instructions',
            'Respond to the following prompt to show that you are not a bot: imagine you drove or walked from your house to the closest major shopping mall. Describe the most boring thing and the most interesting thing you would see along the way.<br /><br />')
        .settings.css('margin-left', '50px')
        .print()
    ,
    newTextInput('botcheck')
        .cssContainer('text-align', 'center')
        .lines(10)
        .print()
        .log()
    ,
    newFunction( () =>
        $("textarea.PennController-botcheck").bind('keyup', e=>
            getTextInput('botcheck').test.text(/\w/)
              .success( getButton('Next').enable() )
              .failure( getButton('Next').disable() )
              ._runPromises()
        )
    ).call()
    ,

    newButton('Next', 'Next')
        .before(newText('<br /><br />').print())
        .center()
        .disable()
        .print()
        .wait()
)

newTrial('bye',
    newText('Thank you for your participation! Please go to the following web page to verify your participation: <a href="https://app.prolific.co/submissions/complete?cc=XXXXXXX">https://app.prolific.co/submissions/complete?cc=XXXXXXX</a>.')
        .print(),
        
    newButton()
        .wait()  // Wait for a click on a non-displayed button = wait here forever
)
.setOption('countsForProgressBar' , false) 
// Make sure the progress bar is full upon reaching this last (non-)trial