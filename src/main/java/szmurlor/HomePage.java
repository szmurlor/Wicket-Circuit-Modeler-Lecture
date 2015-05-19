package szmurlor;

import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.model.LoadableDetachableModel;
import org.apache.wicket.model.Model;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.request.mapper.parameter.PageParameters;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.WebPage;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

public class HomePage extends BasePage {
	private static final long serialVersionUID = 1L;
    private final Model<String> samochodModel;
    private String odpowiedz = "?";

    public HomePage(final PageParameters parameters) {
		super(parameters);

		add(new Label("welcomeText",
                        new LoadableDetachableModel<String>() {
                            @Override
                            protected String load() {
                                return "Witam o godzinie: " + new SimpleDateFormat("HH:mm:ss").format(new Date());
                            }
                        }
        ));

		// TODO Add your page's components here

        add( new ListView<String>("lista", Arrays.asList("Lamborgini", "Porche Carrera", "Jeep Wrangler", "Polonez")) {

            @Override
            protected void populateItem(ListItem<String> listItem) {
                listItem.add( new Label("marka", listItem.getModelObject()) );
            }
        });

        Form<Void> form;
        add( form = new Form<Void>("form") );
        form.add( new TextField<String>("samochod", samochodModel = new Model<String>() ));
        form.add( new Button("cmd") {
            @Override
            public void onSubmit() {
                super.onSubmit();

                //if (samochodModel.getObject() != null && samochodModel.getObject().equals("Maluch")) {
                if ("Maluch".equalsIgnoreCase(samochodModel.getObject())) {
                    odpowiedz = "Masz fajny samochód!!!";
                } else {
                    odpowiedz = "Ale bieda....";
                }
            }
        });

        add( new Label("odpowiedz", new PropertyModel<String>(this, "odpowiedz") ));
    }
}
