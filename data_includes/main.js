PennController.ResetPrefix(null) // Shorten command names (keep this line here)
//PennController.DebugOff()

PennController.SetCounter( 'setcounter' );

Sequence('setcounter', 'consent', 'intro', 'instruction', randomize('trial_prac'), 'instruction2',
         rshuffle('trial_agr-att', 'trial_that', 'trial_experiencer', 'trial_filler', 'trial_whif'),
         'feedback', SendResults(), 'bye')

newTrial('consent',
    newText('CONSENT GOES HERE<br /><br />')
        .settings.css('margin-left', '50px')
        .print()
    ,

    newButton('Next','Next')
        .center()
        .print()
        .wait()
)

newTrial('intro',
    newText('INSTRUCTIONS GO HERE<br /><br />')
        .settings.css('margin-left','50px')
        .print()
    ,
    newTextInput('ProlificID')
        .before(newText('ID', 'Your Prolific ID:&nbsp;<p>')
                    .settings.css('margin-left', '50px')
                    .settings.css('vertical-align', 'middle')
                    .settings.css('height', '20pt'))
        .settings.css('width', '30%')
        .settings.css('height', '14pt')
        .print()
        .log()
    ,
    newFunction( () =>
        $("textarea.PennController-ProlificID").bind('keyup', e=>
            getTextInput('ProlificID').test.text(/\w/)
              .success( getButton('Next').enable() )
              .failure( getButton('Next').disable() )
              ._runPromises()
        )
    ).call()
    ,
    newText('<br />')
        .center()
        .print()
    ,
    newButton('Next','Next')
        .center()
        .print()
        .disable()
        .wait()
)

newTrial('instruction',
    newText('Instr', 'INSTRUCTIONS GO HERE<br />')
        .settings.css('margin-left', '50px')
        .print()
    ,
    newButton('Click','Click here to begin practice trials!')
        .center()
        .print()
        .wait()
)

PennController.Template('practice.csv', variable => ['trial_prac',
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
                  normalMessage: '+', 
                  errorMessage: 'Timed out. Please respond more quickly.'}
    ,
    'PennController', PennController()
        .log(variable.Sentence)
   ]
)

newTrial('instruction2',
    newText('Instr2', 'POST-PRACTICE INSTRUCTIONS GO HERE<br />')
        .settings.css('margin-left', '50px')
        .print()
    ,

    newButton('Click','Click here to begin the experiment')
        .center()
        .print()
        .wait()
)

PennController.Template('agr-att.csv', variable => ['trial_agr-att',
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
                  normalMessage: '+', 
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

PennController.Template('that.csv', variable => ['trial_that',
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
                  normalMessage: '+', 
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

PennController.Template('experiencer.csv', variable => ['trial_experiencer',
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
                  normalMessage: '+', 
                  errorMessage: 'Timed out. Please respond more quickly.'}
    ,
    'PennController', PennController()
        .log(variable.Group)
        .log(variable.Item)
        .log(variable.VerbType)
        .log(variable.Verb)
        .log(variable.SentenceVoice)
        .log(variable.VerbFrequency)
        .log(variable.VerbLength)
        .log(variable.EmotionalValence)
        .log(variable.EVPairType)
        .log(variable.Sentence)
   ]
)

PennController.Template('fillers.csv', variable => ['trial_filler',
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
                  normalMessage: '+', 
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

PennController.Template('whif.csv', variable => ['trial_whif',
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
                  normalMessage: '+', 
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

PennController('feedback',
    newText('feedback_instruction','Do you have any feedback on the experiment or how you were making your decisions? (Optional)<br /><br />')
        .settings.css('margin-left', '50px')
        .print()
    ,
    newTextInput('feedback', '')
        .cssContainer('text-align', 'center')
        .log()
        .lines(10)
        .print()
    ,
    newText('bot_instructions',
            '<br /><br />Respond to the following prompt to show that you are not a bot: describe something interesting you\'d see while driving to the mall.<br /><br />')
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
              .success( getButton('Send').enable() )
              .failure( getButton('Send').disable() )
              ._runPromises()
        )
    ).call()
    ,
    newText('<br />')
        .center()
        .print()
    ,
    newButton('Send','Send Results')
        .center()
        .print()
        .disable()
        .wait()
)

// Spaces and linebreaks don't matter to the script: we've only been using them for the sake of readability
newTrial('bye' ,
    newText('Thank you for your participation! Please go to the following web page to verify your participation: <a href="https://app.prolific.co/submissions/complete?cc=XXXXXXX">https://app.prolific.co/submissions/complete?cc=XXXXXXX</a>.')
        .print(),
        
    newButton()
        .wait()  // Wait for a click on a non-displayed button = wait here forever
)
.setOption('countsForProgressBar' , false)
// Make sure the progress bar is full upon reaching this last (non-)trial