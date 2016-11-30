<?php

use Nette\Application\UI;
use Nette\Forms\Container,
    Nette\Utils\Strings,
    Nette\Forms\Controls\SubmitButton;
use Nette\Mail\SmtpMailer,
	Nette\Mail\Message;

class InquiryForm extends Nette\Application\UI\Control {

    /**
	 * @var Nette\Mail\IMailer @inject
	 */
	private $mailer;

    public function __construct(Nette\Mail\IMailer $mailer)
    {
        parent::__construct();
        $this->mailer = $mailer;
    }

    public function render() {
        $template = $this->template;
        $template->setFile(__DIR__ . '/InquiryForm.latte');
        $template->render();
    }

	/**
	 * @return Form
	 */
    protected function createComponentInquiryForm() {
        $form = new UI\Form;
        $area = array(
            'plzen' => 'Plzeňský kraj',
            'kv' => 'Karlovarský kraj',
            'usti' => 'Ústecký kraj',
            'liberec' => 'Liberecký kraj',
            'kh' => 'Královehradecký kraj',
            'pardubice' => 'Pardubický kraj',
            'olomouc' => 'Olomoucký kraj',
            'ms' => 'Moravskoslezský kraj',
            'zlin' => 'Zlínský kraj',
            'jm' => 'Jihomoravský kraj',
            'vysocina' => 'Vysočina',
            'jc' => 'Jihočeský kraj',
            'praha' => 'Praha',
            'sc' => 'Středočeský kraj',
            );
        $form->addSelect('map', 'Area *', $area)
            //->setRequired()
            ->setPrompt('Choose');

        $form->addText('name', 'Name *')
            ->setRequired();
        $form->addText('email', 'E-mail *')
            ->addRule(UI\Form::EMAIL, 'Adress must be valid.')
            ->setRequired();
        $form->addText('phone', 'Phone *')
            ->setRequired();
        $form->addTextarea('description', 'Description')
            ->setAttribute('onfocus', 'clearContents(this)')
            ->setDefaultValue('Describe your ideas...');

        $removeEvent = \Nette\Utils\Callback::closure($this, 'MyFormRemoveElementClicked');
        $form->addMultiUpload('files', 'Files')
            ->addRule(UI\Form::MAX_FILE_SIZE, 'Max file size is 20 MB.', 200000 * 1024 /* v bytech */);

        $form->addSubmit('send')
            ->getControlPrototype()
                ->setName('button')
                    ->setHtml('<span class="glyphicon glyphicon-send" aria-hidden="true"></span> Send');
        $form->onSuccess[] = [$this, 'processForm'];
        $form->onError[] = array($this, 'errorForm');
        return $form;
    }

    /**
	 * @param Form $form
	 */
    public function processForm(UI\Form $form, Nette\Utils\ArrayHash $values) {
        $template = $this->createTemplate()
            ->setFile(__DIR__ . '/EmailInfo.latte');
        $template->inquiry = $values;
        
        $mail = new Message;
        $mail->setFrom($values->email, $values->name)
                ->addTo('fjpikl@gmail.com')
                ->setHTMLBody($template);

        foreach($values->files as $f) {
            if ($f->isOK()) {
                $f->move(__DIR__ . '/../../www/upload/' . Strings::webalize($f->name, '.', true));
            }
            $mail->addAttachment(__DIR__ . '/../../www/upload/' . Strings::webalize($f->name, '.', true));
        }

        try {
            $this->mailer->send($mail);
            $this->flashMessage('Inquiry was sent. We will contact you soon.', 'success');
            foreach($values->files as $f) {
                unlink(__DIR__ . '/../../www/upload/' . Strings::webalize($f->name, '.', true));
            }
            $this->redirect('this');
        } catch (Nette\Mail\SmtpException $e) {
            $this->flashMessage('Try it again, please.', 'warning');
        }
    }
    
    public function errorForm(Form $form){
        if($this->presenter->isAjax()){
            $this->redrawControl('inquiryForm');
        }
    }

}